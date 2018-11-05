import websockets
import cv2
import numpy as np
import asyncio
import base64


def decode(string_data):
    string_data = base64.b64decode(string_data)
    np_data = np.frombuffer(string_data, dtype=np.uint8)
    frame = cv2.imdecode(np_data, 1)
    return frame


async def receive():
    async with websockets.connect("ws://192.168.86.174:5000/video") as websocket:
        while True:
            string_data = await websocket.recv()
            frame = decode(string_data)
            cv2.imshow("frame", frame)
            await websocket.send("received")
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
asyncio.get_event_loop().run_until_complete(receive())
