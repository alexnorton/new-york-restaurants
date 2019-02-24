FROM python:3.7-alpine AS deps

WORKDIR /app

RUN pip install pipenv

ADD server/Pipfile server/Pipfile.lock /app/
RUN /bin/sh -c 'mkdir deps && pipenv lock -r | pip3 install -r /dev/stdin -t deps'

FROM alpine

WORKDIR /app

RUN apk add python3 uwsgi uwsgi-python3

COPY --from=deps /app/deps /app/
ADD server docker/server/uwsgi.ini /app/

ENTRYPOINT uwsgi --ini uwsgi.ini
