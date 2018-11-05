import cv2
import base64
import numpy as np
import websockets
import asyncio

cap = cv2.VideoCapture(0)


def encode(cap):
    _, frame = cap.read()
    frame = cv2.resize(frame, (int(1280/2), int(720/2)))
    _, buffer = cv2.imencode(".jpg", frame)
    string_data = base64.b64encode(buffer)
    print("Type: ", type(string_data))
    return string_data


def decode(string_data):
    np_data = np.frombuffer(string_data, dtype=np.uint8)
    frame = cv2.imdecode(np_data, 1)
    return frame


async def stream(websocket, path):
    print("Starting the server")
    while True:
        data = encode(cap)
        await websocket.send(data)
        send = await websocket.recv()

start_server = websockets.serve(stream, '0.0.0.0', 5000)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
# print(encode(cap))
