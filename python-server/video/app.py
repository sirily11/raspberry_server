from quart import Quart, render_template
from quart import websocket
import json
from sense_hat import SenseHat
from robot import Robot
import cv2
import base64
import asyncio

app = Quart(__name__,
            template_folder="../react-display/build",
            static_folder="../react-display/build/static")


def encode(cap):
    _, frame = cap.read()
    frame = cv2.resize(frame, (int(1280/2), int(720/2)))
    _, buffer = cv2.imencode(".jpg", frame)
    string_data = base64.b64encode(buffer)
    return str(string_data, encoding="utf-8")


@app.route('/')
def home():
    return render_template('index.html')


@app.websocket("/control")
async def control():
    robot = Robot()
    while True:
        cont = await websocket.receive()
        cont = json.loads(cont)
        if cont['moving'] == "w":
            print("Accelerating")
            robot.accelerate()
        elif cont['moving'] == "s":
            robot.decelerate()
            print("Decelerating")
        elif cont['moving'] == "turn":
            robot.turn(float(cont['turn_to']))
            print("Turning to {}".format(cont['turn_to']))
        elif cont["settings"] == "speed":
            robot.speed = cont["value"]


@app.websocket("/video")
async def video():
    cap = cv2.VideoCapture(0)
    print("Starting the server")
    while True:
        data = encode(cap)
        await websocket.send(data)


@app.websocket('/showText')
async def show_handler():
    sense = SenseHat()
    while True:
        text = await websocket.receive()
        print(text)
        sense.show_message(text)


@app.websocket('/update')
async def update_handler():
    sense = SenseHat()
    sense.set_imu_config(False, True, False)
    while True:
        pressure = int(sense.get_pressure())
        temp = int(sense.get_temperature())
        humidity = int(sense.get_humidity())
        orientation = sense.get_orientation_degrees()

        pitch = int(orientation["pitch"])
        roll = int(orientation["roll"])
        yaw = int(orientation["yaw"])

        data = [{
            "name": "temperture",
            "data": temp
        }, {
            "name": "pressure",
            "data": pressure
        }, {
            "name": "humidity",
            "data": humidity
        },{
            "name": "pitch",
            "data": pitch
        },{
            "name": "roll",
            "data": roll
        },{
            "name": "yaw",
            "data": yaw
        }]
        await websocket.send(json.dumps(data))
        # await asyncio.sleep(0.3)


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True, port=5000)
