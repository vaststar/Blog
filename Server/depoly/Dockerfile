FROM python:3.7
MAINTAINER ZZT

RUN mkdir -p /blog/log
RUN mkdir -p /blog/server

COPY ../app /blog/server
COPY gunicorn_config.py /blog
COPY ../requirements /blog

WORKDIR /blog

RUN pip3 install -r requirements

VOLUME /var/local/imgimg

ENTRYPOINT["gunicorn","-c","gunicorn_config.py","server.main:app"]

EXPOSE 5000