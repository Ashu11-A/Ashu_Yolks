FROM node:16.19.0-alpine AS node
FROM alpine:latest

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apk --update --no-cache add curl ca-certificates nginx
RUN apk update

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
    coreutils \
    mariadb \
    redis \

RUN apk add --no-cache --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing --update lolcat figlet

RUN echo "**** Instalação dos PHP ****" && \
    apk add --no-cache --update \
    php \
    php-cli \
    php-gd \
    php-mysqli \
    php-pdo \
    php-pdo_odbc \
    php-pdo_mysql \
    php-mbstring \
    php-tokenizer \
    php-bcmath \
    php-xml \
    php-simplexml \
    php-xmlwriter \
    php-xmlreader \
    php-fpm \
    php-curl \
    php-zip \
    php-phar \
    php-intl \
    php-ctype \
    php-json \
    php-posix \
    php-zlib \
    php-fileinfo \
    php-ftp \
    php-pcntl \
    php-bz2 \
    php-gd \
    php-opcache \
    php-gmp \
    php-imap \
    php-ldap \
    php-sodium \
    php-exif \
    php-session \
    php-soap \
    php-openssl \
    php-odbc \
    php-gettext \
    php-iconv \
    php-tokenizer

COPY --from=composer:latest  /usr/bin/composer /usr/bin/composer

RUN apk add --no-cache bash fakeroot

# Remove o link simbólico para o shell padrão e cria um novo link simbólico para o bash
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

COPY --from=node /usr/lib /usr/lib
COPY --from=node /usr/local/share /usr/local/share
COPY --from=node /usr/local/lib /usr/local/lib
COPY --from=node /usr/local/include /usr/local/include
COPY --from=node /usr/local/bin /usr/local/bin

RUN echo "UTC" > /etc/timezone

COPY ./crontab_test.sh /
RUN chmod 777 /crontab_test.sh

USER container
ENV  USER container
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD [ "bash", "/entrypoint.sh" ]