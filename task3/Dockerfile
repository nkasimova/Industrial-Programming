FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /code/django & mkdir /code/react & mkdir /npm
WORKDIR /npm
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -
RUN apt-get install -y nodejs
RUN npm install create-react-app react react-scripts
WORKDIR /code
ADD ./requirements.txt /code/
RUN pip install -r requirements.txt