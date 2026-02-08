FROM alpine:3.20

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apk update && \
  apk add --no-cache \
  ca-certificates \
  curl \
  git \
  tar \
  unzip \
  bash

RUN echo "http://dl-cdn.alpinelinux.org/alpine/v3.20/community" >> /etc/apk/repositories && \
  echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories && \
  apk update && \
  apk add --no-cache figlet lolcat

ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    USER=container \
    HOME=/home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh
CMD ["/bin/bash", "/entrypoint.sh"]