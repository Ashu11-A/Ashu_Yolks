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

RUN echo "**** Instalação dos php81 ****" && \
    apk add --no-cache --update \
    php81 \
    php81-ctype \
    php81-json \
    php81-posix \
    php81-zlib \
    php81-fileinfo \
    php81-ftp \
    php81-pcntl \
    php81-phar \
    php81-fpm \
    php81-dom \
    php81-xml \
    php81-simplexml \
    php81-mbstring \
    php81-xmlwriter \
    php81-xmlreader \
    php81-pdo_mysql \
    php81-mysqli \
    php81-bcmath \
    php81-bz2 \
    php81-curl \
    php81-gd \
    php81-opcache \
    php81-gmp \
    php81-imap \
    php81-intl \
    php81-ldap \
    php81-sodium \
    php81-zip \
    php81-exif \
    php81-session \
    php81-soap \
    php81-openssl \
    php81-pdo_odbc \
    php81-pdo \
    php81-odbc \
    php81-gettext \
    php81-iconv \
    php81-tokenizer

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