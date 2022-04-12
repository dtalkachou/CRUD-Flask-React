FROM python:3.10-buster
RUN apt-get update && apt-get upgrade -y
RUN mkdir -p /home/backend
WORKDIR /home/backend
COPY requirements.txt ./
RUN pip install -r requirements.txt
