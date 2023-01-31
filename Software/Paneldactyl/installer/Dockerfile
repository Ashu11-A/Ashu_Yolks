FROM php:8.1-rc-fpm-alpine

RUN apk --update --no-cache add curl ca-certificates nginx
RUN apk update

ENV LD_PRELOAD="/usr/lib/preloadable_libiconv.so"

RUN apk add --no-cache --virtual=build-dependencies --upgrade \
    file \
    re2c \
    samba-dev \
    zlib-dev \
    libtool \
    git \
    gpg \
    autoconf \
    automake \
    file \
    g++ \
    gcc \
    make \
    re2c

RUN  apk add --no-cache --upgrade \
    ffmpeg \
    gnu-libiconv \
    imagemagick \
    libxml2 \
    samba-client \
    sudo \
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

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN docker-php-ext-install mysqli pdo pdo_mysql
