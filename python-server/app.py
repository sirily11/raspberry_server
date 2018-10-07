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
        acceleration = sense.get_accelerometer_raw()
        pressure = sense.get_pressure()
        temp = sense.get_temperature()
        humidity = sense.get_humidity()

        x = acceleration['x']
        y = acceleration['y']
        z = acceleration['z']

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
            "data": "X:{},Y:{},Z:{}".format(x, y, z)
        }]
        await websocket.send(json.dumps(data))
        time.sleep(1)


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
