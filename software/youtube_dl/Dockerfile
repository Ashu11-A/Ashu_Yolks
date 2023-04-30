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
    libmagic-dev

RUN set -xe \
    && apk add --no-cache -Uu attr gnupg \
    && curl -Lo /usr/local/bin/youtube-dl https://yt-dl.org/downloads/latest/youtube-dl \
    && curl -Lo /tmp/youtube-dl.sig https://yt-dl.org/downloads/latest/youtube-dl.sig \
    && gpg --keyserver keyserver.ubuntu.com --recv-keys '7D33D762FD6C35130481347FDB4B54CBA4826A18' \
    && gpg --keyserver keyserver.ubuntu.com --recv-keys 'ED7F5BF46B3BBED81C87368E2C393E0F18A9236D' \
    && gpg --verify /tmp/youtube-dl.sig /usr/local/bin/youtube-dl \
    && chmod a+rx /usr/local/bin/youtube-dl \
    && apk del --purge gnupg \
    && rm -rf /var/cache/apk/* /tmp/*

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
