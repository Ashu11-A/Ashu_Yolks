FROM node:16.19.0-alpine AS node
FROM alpine:latest

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apk --update --no-cache add curl ca-certificates nginx
RUN apk update

RUN apk add --no-cache --virtual=build-dependencies --upgrade \
    file \
    git \
    g++ \
    gcc \
    wget \
    jq \
    tar \
    unzip \
    curl \
    ffmpeg \
    python3 \
    py3-pip \
    libmagic

RUN pip install -U yt-dlp

# Esse codigo o Drylian me passou a
# Instala o bash
RUN apk add --no-cache bash fakeroot

# Remove o link simbólico para o shell padrão e cria um novo link simbólico para o bash
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN set -eux \
    & apk add \
        --no-cache \
        yarn

RUN echo "UTC" > /etc/timezone

USER container
ENV  USER container
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD [ "bash", "/entrypoint.sh" ]
