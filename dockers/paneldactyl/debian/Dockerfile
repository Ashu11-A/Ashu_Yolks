FROM debian:buster-slim

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"
ENV PHP_VERSION="8.2"

RUN apt update \
    && apt upgrade -y \
    && apt-get install -y --no-install-recommends -y \
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
    fakeroot

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

RUN echo "**** Instalação dos php${PHP_VERSION} ****" && \
    apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends -y \
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

RUN echo "UTC" > /etc/timezone

COPY ./crontab_test.sh /
RUN chmod 777 /crontab_test.sh

USER container
ENV  USER container
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD [ "bash", "/entrypoint.sh" ]