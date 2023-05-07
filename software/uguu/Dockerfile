FROM node:16.16.0-alpine AS node
FROM alpine:latest

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apk update

RUN apk add --no-cache --upgrade \
    file \
    git \
    wget \
    jq \
    tar \
    unzip \
    curl

RUN echo "**** Instalação das dependecias ****" && \
    apk add --no-cache --update \
    build-base \
    sqlite \
    fakeroot

RUN echo "**** Instalação dos PHP ****" && \
    apk add --no-cache --update \
    php \
    php-fpm \
    php-sqlite3 \
    php-curl \
    php-cli \
    php-pdo_mysql \
    php-mysqli \
    php-zip \
    php-common \
    php-readline \
    php-bcmath \
    php-xml \
    php-simplexml

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN chmod +x /usr/local/bin/install-php-extensions && \
    install-php-extensions lz4 mcrypt xdebug

# Esse codigo o Drylian me passou
# Instala o bash
RUN apk add --no-cache bash

# Remove o link simbólico para o shell padrão e cria um novo link simbólico para o bash
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

COPY --from=node /usr/lib /usr/lib
COPY --from=node /usr/local/share /usr/local/share
COPY --from=node /usr/local/lib /usr/local/lib
COPY --from=node /usr/local/include /usr/local/include
COPY --from=node /usr/local/bin /usr/local/bin

RUN echo "UTC" > /etc/timezone

USER container
ENV  USER container
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD [ "bash", "/entrypoint.sh" ]