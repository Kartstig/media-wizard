FROM python:latest

MAINTAINER Herman Singh "kartstig@gmail.com"

WORKDIR /code

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ./start.sh
