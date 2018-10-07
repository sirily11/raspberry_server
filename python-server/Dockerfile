FROM resin/raspberrypi3-python:3.6.1
WORKDIR /usr/src/server/python-server
RUN pip3 install sense-hat
RUN python3 setup.py install 
WORKDIR /usr/src/server/python-server
RUN pip3 install quart
CMD ["python3","./app.py"]