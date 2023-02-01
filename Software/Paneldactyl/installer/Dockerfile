FROM php:8.1-rc-fpm-alpine

RUN apk --update --no-cache add curl ca-certificates nginx
RUN apk update

ENV LD_PRELOAD="/usr/lib/preloadable_libiconv.so"

RUN apk add --upgrade \
    file \
    re2c \
    zlib-dev \
    libtool \
    git \
    gpg \
    autoconf \
    automake \
    file \
    wget \
    jq 

RUN  apk add --upgrade \
    ffmpeg \
    gnu-libiconv \
    imagemagick \
    libxml2 \
    samba-client \
    sudo \
    tar \
    unzip \
    curl \
    libzip-dev

RUN echo "**** Instalação dos PHP ****" && \
    apk add --update \
    php81 \
    php81-cli \
    php81-gd \
    php81-pdo \
    php81-mbstring \
    php81-tokenizer \
    php81-bcmath \
    php81-xml \
    php81-fpm \
    php81-curl \
    php81-zip \
    php-intl \
    php81-fileinfo \
    php81-session \
    redis \
    nano

COPY --from=composer:latest  /usr/bin/composer /usr/bin/composer

RUN docker-php-ext-install mysqli && \
    docker-php-ext-install pdo && \
    docker-php-ext-install pdo_mysql && \
    docker-php-ext-install ext-bcmath && \
    docker-php-ext-install ext-zip

RUN docker-php-ext-enable mysqli && \
    docker-php-ext-enable pdo && \
    docker-php-ext-enable pdo_mysql && \
    docker-php-ext-enable pdo_mysql && \
    docker-php-ext-enable sodium

RUN apk add bash
RUN sed -i 's/bin\/ash/bin\/bash/g' /etc/passwd

RUN mkdir -p /etc/supervisor.d/
COPY ./supervisord.ini /etc/supervisor.d/supervisord.ini