from sense_hat import SenseHat
import time
import sys

sense = SenseHat()
sense.set_imu_config(False, True, False)
startime = time.time()

while True:

    orientation = sense.get_orientation_degrees()
    print(orientation['yaw'])
    time.sleep(0.3)

