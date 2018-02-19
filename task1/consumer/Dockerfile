FROM ubuntu
RUN apt-get update && apt-get -y upgrade
RUN apt-get install -y python3-pip
RUN pip3 install py-postgresql
RUN pip3 install pika
ADD consumer.py consumer.py
ENTRYPOINT python3 consumer.py