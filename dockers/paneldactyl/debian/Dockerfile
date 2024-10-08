
FROM php:8.2-fpm

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"
ENV PHP_VERSION="8.2"

ADD --chmod=0755 https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

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
    fakeroot \
    libsodium-dev \
    # Zip
    libzip-dev \
    zip \
    libpng-dev \
    libicu-dev \
    yarn

RUN docker-php-ext-install \
    zip \
    intl \
    sodium \
    pdo_mysql \
    pdo \
    mysqli \
    gd \
    bcmath
    # xml \
    # tokenizer \
    # simplexml \
    # session \
    # posix \
    # phar \
    # mbstring \
    # fileinfo \
    # curl \
    # dom \
    # common \

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

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