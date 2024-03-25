FROM node:16.19.0-alpine AS node
FROM alpine:latest

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apk --update --no-cache add curl ca-certificates nginx
RUN apk update

ENV LD_PRELOAD="/usr/lib/preloadable_libiconv.so"

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

RUN echo "**** Instalação dos php8.1 ****" && \
    apk add --no-cache --update \
    php8.1 \
    php8.1-ctype \
    php8.1-json \
    php8.1-posix \
    php8.1-zlib \
    php8.1-fileinfo \
    php8.1-ftp \
    php8.1-pcntl \
    php8.1-phar \
    php8.1-fpm \
    php8.1-dom \
    php8.1-xml \
    php8.1-simplexml \
    php8.1-mbstring \
    php8.1-xmlwriter \
    php8.1-xmlreader \
    php8.1-pdo_mysql \
    php8.1-mysqli \
    php8.1-bcmath \
    php8.1-bz2 \
    php8.1-curl \
    php8.1-gd \
    php8.1-opcache \
    php8.1-gmp \
    php8.1-imap \
    php8.1-intl \
    php8.1-ldap \
    php8.1-sodium \
    php8.1-zip \
    php8.1-exif \
    php8.1-session \
    php8.1-soap \
    php8.1-openssl \
    php8.1-pdo_odbc \
    php8.1-pdo \
    php8.1-odbc \
    php8.1-gettext \
    php8.1-iconv \
    php8.1-tokenizer

COPY --from=composer:latest  /usr/bin/composer /usr/bin/composer

# Esse codigo o Drylian me passou
# Instala o bash a
RUN apk add --no-cache bash fakeroot

# Remove o link simbólico para o shell padrão e cria um novo link simbólico para o bash
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

COPY --from=node /usr/lib /usr/lib
COPY --from=node /usr/local/share /usr/local/share
COPY --from=node /usr/local/lib /usr/local/lib
COPY --from=node /usr/local/include /usr/local/include
COPY --from=node /usr/local/bin /usr/local/bin

RUN set -eux \
    & apk add \
        --no-cache \
        yarn

RUN echo "UTC" > /etc/timezone

COPY ./crontab_test.sh /
RUN chmod 777 /crontab_test.sh

USER container
ENV  USER container
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD [ "bash", "/entrypoint.sh" ]