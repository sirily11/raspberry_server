from pycreate2 import Create2
import time
port = "/dev/ttyUSB0"
bot = Create2(port)

bot.start()
time.sleep(1)
print("Changing to passive mode")
bot.power()
time.sleep()
bot.close()
