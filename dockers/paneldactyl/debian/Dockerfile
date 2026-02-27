FROM php:8.2-fpm

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

ADD --chmod=0755 https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN apt update
RUN apt upgrade -y 
RUN apt-get install -y --no-install-recommends -y \
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
    libsodium-dev \
    libzip-dev \
    zip \
    libpng-dev \
    libicu-dev \
    default-mysql-client

RUN apt-get install -y lolcat figlet && \
    ln -s /usr/games/lolcat /usr/bin/lolcat

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
    # common

RUN ln -s /usr/sbin/php-fpm${PHP_VERSION} /usr/sbin/php-fpm
COPY --from=composer:latest  /usr/bin/composer /usr/bin/composer

RUN echo "UTC" > /etc/timezone

COPY ./crontab_test.sh /crontab_test.sh
RUN chmod +x /crontab_test.sh

ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    USER=container \
    HOME=/home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh
CMD ["/bin/bash", "/entrypoint.sh"]