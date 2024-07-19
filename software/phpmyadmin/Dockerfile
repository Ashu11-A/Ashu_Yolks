FROM alpine:3.14

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apk --update --no-cache add curl ca-certificates nginx \
    && apk update

RUN apk add --no-cache --virtual=build-dependencies --upgrade \
    file \
    bash \
    re2c \
    zlib-dev \
    libtool \
    git \
    gpg \
    autoconf \
    wget \
    jq \
    gnu-libiconv \
    imagemagick \
    libxml2 \
    tar \
    unzip \
    curl \
    coreutils

RUN apk add --no-cache lolcat figlet --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing

ENV PHP_VERSION="74"

RUN echo "**** Instalação dos PHP ****" && \
    apk add --no-cache --update \
    php${PHP_VERSION} \
    php${PHP_VERSION}-ctype \
    php${PHP_VERSION}-json \
    php${PHP_VERSION}-posix \
    php${PHP_VERSION}-zlib \
    php${PHP_VERSION}-fileinfo \
    php${PHP_VERSION}-ftp \
    php${PHP_VERSION}-pcntl \
    php${PHP_VERSION}-phar \
    php${PHP_VERSION}-fpm \
    php${PHP_VERSION}-dom \
    php${PHP_VERSION}-xml \
    php${PHP_VERSION}-simplexml \
    php${PHP_VERSION}-mbstring \
    php${PHP_VERSION}-xmlwriter \
    php${PHP_VERSION}-xmlreader \
    php${PHP_VERSION}-pdo_mysql \
    php${PHP_VERSION}-mysqli \
    php${PHP_VERSION}-bcmath \
    php${PHP_VERSION}-bz2 \
    php${PHP_VERSION}-curl \
    php${PHP_VERSION}-gd \
    php${PHP_VERSION}-opcache \
    php${PHP_VERSION}-gmp \
    php${PHP_VERSION}-imap \
    php${PHP_VERSION}-intl \
    php${PHP_VERSION}-ldap \
    php${PHP_VERSION}-sodium \
    php${PHP_VERSION}-zip \
    php${PHP_VERSION}-exif \
    php${PHP_VERSION}-session \
    php${PHP_VERSION}-soap \
    php${PHP_VERSION}-openssl \
    php${PHP_VERSION}-pdo_odbc \
    php${PHP_VERSION}-pdo \
    php${PHP_VERSION}-odbc \
    php${PHP_VERSION}-gettext \
    php${PHP_VERSION}-iconv \
    php${PHP_VERSION}-tokenizer

# Remove o link simbólico para o shell padrão e cria um novo link simbólico para o bash
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN ln -s /usr/bin/php${PHP_VERSION} /usr/bin/php

RUN echo "UTC" > /etc/timezone

USER container
ENV  USER container
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD [ "bash", "/entrypoint.sh" ]
