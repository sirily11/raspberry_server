import pygame
import websockets
import asyncio
import time
import cv2
import numpy as np
import asyncio
import base64
from multiprocessing import Process

pygame.init()
j = pygame.joystick.Joystick(0)
j.init()


def decode(string_data):
    string_data = base64.b64decode(string_data)
    np_data = np.frombuffer(string_data, dtype=np.uint8)
    frame = cv2.imdecode(np_data, 1)
    return frame


async def controll():
    print("Ready to control")
    async with websockets.connect("ws://192.168.86.174:5000/controll") as websocket:
        while True:
            prevDegree = 0
            try:
                events = pygame.event.get()
                for event in events:
                    d = int(j.get_axis(0) * 180)
                    a = j.get_button(7)
                    s = j.get_button(6)
                    status = ""
                    if prevDegree != d:
                        if j.get_axis(0) < -0.06 or j.get_axis(0) > 0.06:
                            await websocket.send(str(d))
                            status = ""
                            print("Turning to {}".format(d))
                            prevDegree = d
                            await asyncio.sleep(0.1)
                        else:
                            d = 0
                            prevDegree = d
                            await asyncio.sleep(0.1)
                    if a == 1:
                        await websocket.send("w")
                        status = "w"
                        print("Accelerating")
                        await asyncio.sleep(0.2)
                    elif s == 1:
                        await websocket.send("s")
                        status = "s"
                        print("Decelerating")
                        await asyncio.sleep(0.2)

                    elif event.type == pygame.JOYBUTTONUP:
                        pass
            except Exception as e:
                print(e)
                continue


async def receive():
    print("Getting video data")
    async with websockets.connect("ws://192.168.86.174:5000/video") as websocket:
        while True:
            string_data = await websocket.recv()
            frame = decode(string_data)
            cv2.imshow("frame", frame)
            await websocket.send("received")
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

asyncio.get_event_loop().run_until_complete(controll())
