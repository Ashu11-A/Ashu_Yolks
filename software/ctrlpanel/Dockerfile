FROM debian:buster-slim

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN   apt update \
        &&   apt upgrade -y \
        &&   apt-get install -y --no-install-recommends \
        curl \
        ca-certificates \
        nginx \
        gnupg \
        software-properties-common \
        apt-transport-https  \
        &&   update-ca-certificates

RUN apt-get install -y --no-install-recommends -y \
    file \
    re2c \
    libtool \
    git \
    gpg \
    autoconf \
    automake \
    file \
    wget \
    jq \
    iproute2 \
    imagemagick \
    libxml2 \
    tar \
    unzip \
    curl \
    libzip-dev \
    mariadb-server \
    redis-server \
    lolcat \
    figlet

RUN apt update && apt install -y wget gnupg2 lsb-release && \
wget https://packages.sury.org/php/apt.gpg && apt-key add apt.gpg && \
echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | tee /etc/apt/sources.list.d/php.list

RUN echo "**** Instalação dos PHP ****" && \
    apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
    php8.1 \
    php8.1-cli \
    php8.1-gd \
    php8.1-mysqli \
    php8.1-pdo \
    php8.1-pdo_odbc \
    php8.1-pdo_mysql \
    php8.1-mbstring \
    php8.1-tokenizer \
    php8.1-bcmath \
    php8.1-xml \
    php8.1-simplexml \
    php8.1-xmlwriter \
    php8.1-xmlreader \
    php8.1-fpm \
    php8.1-curl \
    php8.1-zip \
    php8.1-phar \
    php8.1-intl \
    php8.1-ctype \
    php8.1-json \
    php8.1-posix \
    php8.1-zlib \
    php8.1-fileinfo \
    php8.1-ftp \
    php8.1-bz2 \
    php8.1-gd \
    php8.1-opcache \
    php8.1-gmp \
    php8.1-imap \
    php8.1-ldap \
    php8.1-exif \
    php8.1-soap \
    php8.1-odbc \
    php8.1-gettext \
    php8.1-iconv \
    php8.1-tokenizer

COPY --from=composer:latest  /usr/bin/composer /usr/bin/composer

RUN apt-get install -y --no-install-recommends fakeroot

RUN echo "UTC" > /etc/timezone

COPY ./crontab_test.sh /
RUN chmod 777 /crontab_test.sh

USER container
ENV  USER container
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD [ "bash", "/entrypoint.sh" ]