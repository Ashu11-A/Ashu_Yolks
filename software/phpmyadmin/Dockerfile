FROM node:16.19.0-alpine AS node
FROM alpine:latest

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apk --update --no-cache add curl ca-certificates nginx \
    && apk update

RUN apk add --no-cache --virtual=build-dependencies --upgrade \
    file \
    re2c \
    zlib-dev \
    libtool \
    git \
    gpg \
    autoconf \
    automake \
    g++ \
    gcc \
    make \
    wget \
    jq \
    gnu-libiconv \
    imagemagick \
    libxml2 \
    tar \
    unzip \
    curl \
    coreutils

RUN echo "**** Instalação dos PHP ****" && \
    apk add --no-cache --update \
    php \
    php-ctype \
    php-json \
    php-posix \
    php-zlib \
    php-fileinfo \
    php-ftp \
    php-pcntl \
    php-phar \
    php-fpm \
    php-dom \
    php-xml \
    php-simplexml \
    php-mbstring \
    php-xmlwriter \
    php-xmlreader \
    php-pdo_mysql \
    php-mysqli \
    php-bcmath \
    php-bz2 \
    php-curl \
    php-gd \
    php-opcache \
    php-gmp \
    php-imap \
    php-intl \
    php-ldap \
    php-sodium \
    php-zip \
    php-exif \
    php-session \
    php-soap \
    php-openssl \
    php-pdo_odbc \
    php-pdo \
    php-odbc \
    php-gettext \
    php-iconv \
    php-tokenizer

RUN apk add --no-cache lolcat figlet --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing

RUN apk add --no-cache bash fakeroot

# Remove o link simbólico para o shell padrão e cria um novo link simbólico para o bash
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN echo "UTC" > /etc/timezone

USER container
ENV  USER container
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD [ "bash", "/entrypoint.sh" ]