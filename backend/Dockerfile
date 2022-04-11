FROM python:3.10-buster
RUN apt-get update && apt-get upgrade -y
RUN mkdir -p /home/application/backend
WORKDIR /home/application/backend
COPY requirements.txt /home/application/backend/requirements.txt
RUN pip install -r requirements.txt
