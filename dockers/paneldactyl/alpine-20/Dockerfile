FROM node:20-alpine AS node
FROM alpine:3.19

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"
ENV PHP_VERSION="82"

COPY --from=node /usr/lib /usr/lib
COPY --from=node /usr/local/share /usr/local/share
COPY --from=node /usr/local/lib /usr/local/lib
COPY --from=node /usr/local/include /usr/local/include
COPY --from=node /usr/local/bin /usr/local/bin

RUN apk add --no-cache --virtual=build-dependencies --upgrade \
    ca-certificates \
    wget \
    jq \
    tar \
    curl \
    nginx \
    unzip \
    git \
    bash \
    ca-certificates \
    yarn
# build

RUN echo "**** Instalação dos php${PHP_VERSION} ****" && \
    apk add --no-cache --update \
    php${PHP_VERSION} \
    php${PHP_VERSION}-bcmath \
    php${PHP_VERSION}-cli \
    php${PHP_VERSION}-common \
    php${PHP_VERSION}-dom \
    php${PHP_VERSION}-curl \
    php${PHP_VERSION}-intl \
    php${PHP_VERSION}-fileinfo \
    php${PHP_VERSION}-fpm \
    php${PHP_VERSION}-gd \
    php${PHP_VERSION}-mbstring \
    php${PHP_VERSION}-mysqli \
    php${PHP_VERSION}-pdo \
    php${PHP_VERSION}-pdo_mysql \
    php${PHP_VERSION}-phar \
    php${PHP_VERSION}-posix \
    php${PHP_VERSION}-session \
    php${PHP_VERSION}-simplexml \
    php${PHP_VERSION}-sodium \
    php${PHP_VERSION}-tokenizer \
    php${PHP_VERSION}-xml \
    php${PHP_VERSION}-zip

RUN ln -s /usr/sbin/php-fpm${PHP_VERSION} /usr/sbin/php-fpm
COPY --from=composer:latest  /usr/bin/composer /usr/bin/composer

# Esse codigo o Drylian me passou
RUN apk add --no-cache fakeroot
RUN echo "UTC" > /etc/timezone

COPY ./crontab_test.sh /
RUN chmod 777 /crontab_test.sh

USER container
ENV  USER container
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD [ "bash", "/entrypoint.sh" ]