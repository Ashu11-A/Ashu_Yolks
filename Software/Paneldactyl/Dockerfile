FROM php:8.1-rc-fpm-alpine

RUN apk --update --no-cache add curl ca-certificates nginx gnupg  &&   update-ca-certificates
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
    wget \
    jq

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
    redis \
    nano

COPY --from=composer:latest  /usr/bin/composer /usr/bin/composer

RUN docker-php-ext-install mysqli && \
    docker-php-ext-enable mysqli && \
    docker-php-ext-enable sodium

RUN docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable pdo_mysql

USER container
ENV  USER container
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD ["/bin/ash", "/entrypoint.sh"]
