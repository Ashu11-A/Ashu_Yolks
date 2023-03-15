FROM alpine:latest

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
    curl

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

COPY --from=composer:latest  /usr/bin/composer /usr/bin/composer


RUN apk add fakeroot

# Esse codigo o Drylian me passou
# Instala o bash
RUN apk add --no-cache bash

# Remove o link simbólico para o shell padrão e cria um novo link simbólico para o bash
RUN rm /bin/sh && ln -s /bin/bash /bin/sh