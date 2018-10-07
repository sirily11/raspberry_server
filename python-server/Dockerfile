FROM resin/raspberrypi3-python:3.6.1
WORKDIR /usr/src/server/python-server
COPY Pipfile Pipfile
RUN apt-get update
RUN apt-get install sense-hat
RUN curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
RUN python3 get-pip.py
RUN sudo -H pip3 install -U pipenv
RUN pipenv install
CMD ['pipenv run python3','app.py']