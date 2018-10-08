from quart import Quart, render_template
from quart import websocket
import json
import time
from sense_hat import SenseHat
from math import sqrt

app = Quart(__name__,
            template_folder="../react-display/deploy",
            static_folder="../react-display/deploy/static")


@app.route('/')
def home():
    return render_template('index.html')


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
    sense.clear()
    while True:
        acceleration = sense.get_accelerometer_raw()
        pressure = round(sense.get_pressure(), 3)
        temp = round(sense.get_temperature(), 3)
        humidity = round(sense.get_humidity(), 3)

        x = round(acceleration['x'], 3)
        y = round(acceleration['y'], 3)
        z = round(acceleration['z'], 3)
        speed = (sqrt(x**2+y**2))/2

        data = [{
            "name": "temperture",
            "data": temp
        }, {
            "name": "pressure",
            "data": pressure
        }, {
            "name": "humidity",
            "data": humidity
        }, {
            "name": "Acceleration",
            "data": "X:{}\nY:{}\nZ:{}".format(x, y, z)
        }, {
            "name": "Speed",
            "data": round(speed, 3)
        }]
        await websocket.send(json.dumps(data))
        time.sleep(1)


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
