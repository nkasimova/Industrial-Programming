FROM ubuntu
RUN apt-get update && apt-get -y upgrade
RUN apt-get install -y python3-pip
RUN pip3 install pika
ADD producer.py producer.py