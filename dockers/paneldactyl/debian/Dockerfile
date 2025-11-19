FROM php:8.2-fpm

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"
ENV PHP_VERSION="8.2"
ENV USER=container
ENV HOME=/home/container

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
    fakeroot \
    libsodium-dev \
    libzip-dev \
    zip \
    libpng-dev \
    libicu-dev

RUN apt-get install -y lolcat figlet

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

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

WORKDIR /home/container
USER container

CMD [ "bash", "/entrypoint.sh" ]
