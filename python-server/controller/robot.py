from pycreate2 import Create2


class Robot:
    def __init__(self):
        port = "/dev/ttyUSB0"
        self.speed = 200
        self.bot = Create2(port)
        self.bot.start()
        self.bot.full()

    def accelerate(self):
        self.bot.drive_direct(self.speed, self.speed)

    def decelerate(self):
        self.bot.drive_direct(0, 0)

    def turn(self, degree):
        if degree > 10:
            self.bot.drive_direct(-self.speed, self.speed)
        elif degree < -10:
            self.bot.drive_direct(self.speed, -self.speed)
