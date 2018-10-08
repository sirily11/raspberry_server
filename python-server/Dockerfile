FROM resin/raspberrypi3-python:3.6.1
WORKDIR /usr/src/server/python-server
RUN pip3 install sense-hat
WORKDIR /usr/src/server/python-server
RUN pip3 install quart
RUN git clone https://github.com/RPi-Distro/RTIMULib.git
WORKDIR /usr/src/server/python-server/RTIMULib/Linux/python
RUN python3 setup.py build
RUN python3 setup.py install
WORKDIR /usr/src/server/python-server
CMD ["python3","./app.py"]