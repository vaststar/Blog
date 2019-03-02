FROM python:3.7
MAINTAINER ZZT

RUN mkdir -p /blog/app
RUN mkdir -p /blog/log

COPY app /blog/server
COPY deploy/gunicorn_config.py /blog
COPY requirements /blog
COPY deploy/start.sh /blog

WORKDIR /blog

RUN pip3 install -r requirements

#VOLUME /var/local/imgimg

#CMD ["gunicorn","-c","gunicorn_config.py","app.main:app"]
CMD ["./start.sh"]

EXPOSE 4444