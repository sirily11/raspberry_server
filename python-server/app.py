from quart import Quart, render_template
from quart import websocket
import json
import time
from sense_hat import SenseHat

app = Quart(__name__,
            template_folder="../react-display/build",
            static_folder="../react-display/build/static")


@app.route('/')
def home():
    return render_template('index.html')


@app.websocket('/update')
async def update_handler():
    sense = SenseHat()
    sense.clear()
    while True:
        pressure = sense.get_pressure()
        temp = sense.get_temperature()
        humidity = sense.get_humidity()

        data = [{
            "name": "temperture",
            "data": temp
        }, {
            "name": "pressure",
            "data": pressure
        }, {
            "name": "humidity",
            "data": humidity
        }]
        await websocket.send(json.dumps(data))
        time.sleep(3)


if __name__ == '__main__':
    app.run(debug=True)
