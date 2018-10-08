FROM resin/raspberrypi3-python:3.6.1
WORKDIR /usr/src/server/python-server
RUN pip3 install sense-hat
WORKDIR /usr/src/server/python-server
RUN pip3 install quart
CMD ["python3","./app.py"]