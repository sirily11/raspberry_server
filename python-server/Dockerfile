FROM resin/raspberrypi3-python:3.6.1
WORKDIR /usr/src/server/python-server
COPY Pipfile Pipfile
RUN apt-get update
RUN pip3 install sense-hat
RUN pip3 install quart
RUN pip3 install websockets
CMD ["python3","./app.py"]