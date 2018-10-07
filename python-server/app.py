from quart import Quart, render_template
from quart import websocket
import json
import time
from sense_hat import SenseHat

app = Quart(__name__,
            template_folder="../react-display/deploy",
            static_folder="../react-display/deploy/static")


@app.route('/')
def home():
    return render_template('index.html')


@app.websocket('/update')
async def update_handler():
    sense = SenseHat()
    sense.clear()
    while True:
        acceleration = round(sense.get_accelerometer_raw(),3)
        pressure = round(sense.get_pressure(),3)
        temp = round(sense.get_temperature(),3)
        humidity = round(sense.get_humidity(),3)

        x = round(acceleration['x'],3)
        y = round(acceleration['y'],3)
        z = round(acceleration['z'],3)

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
        }]
        await websocket.send(json.dumps(data))
        time.sleep(1)


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
