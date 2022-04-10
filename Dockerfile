FROM python:3.10-buster
RUN apt-get update && apt-get upgrade -y
RUN mkdir /home/application
WORKDIR /home/application
COPY requirements.txt /home/application/requirements.txt
RUN pip install -r requirements.txt
