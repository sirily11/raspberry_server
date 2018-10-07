import asyncio
import websockets
import json
import time


async def hello(websocket, path):
    i = 0
    while True:
        i += 1
        data = [{
            "name": "temperture",
            "data": i
        }]
        await websocket.send(json.dumps(data))
        time.sleep(3)

start_server = websockets.serve(hello, '0.0.0.0', 5678)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
