FROM alpine:latest

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apk update

RUN apk add --no-cache --upgrade \
    file \
    git \
    gpg \
    wget \
    jq \
    unzip \
    zip \
    curl \
    libmagic \
    fakeroot

RUN set -eux \
    & apk add \
        --no-cache \
        yarn

# Esse codigo o Drylian me passou a
# Instala o bash
RUN apk add --no-cache bash

# Remove o link simbólico para o shell padrão e cria um novo link simbólico para o bash
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN echo "UTC" > /etc/timezone

USER container
ENV  USER container
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD [ "bash", "/entrypoint.sh" ]