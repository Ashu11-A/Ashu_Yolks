FROM debian:buster-slim

RUN apt update
RUN apt-get install -y --no-install-recommends -y curl ca-certificates nginx gnupg software-properties-common apt-transport-https  &&   update-ca-certificates
RUN apt-get update

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
    iproute2

RUN  apt-get install -y --no-install-recommends -y \
    imagemagick \
    libxml2 \
    sudo \
    tar \
    unzip \
    curl \
    libzip-dev

RUN apt update && apt install -y wget gnupg2 lsb-release && \
wget https://packages.sury.org/php/apt.gpg && apt-key add apt.gpg && \
echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | tee /etc/apt/sources.list.d/php.list

RUN echo "**** Instalação dos PHP ****" && \
    apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends -y \
    php8.1 \
    php8.1-cli \
    php8.1-gd \
    php8.1-mysql \
    php8.1-pdo \
    php8.1-mbstring \
    php8.1-tokenizer \
    php8.1-bcmath \
    php8.1-xml \
    php8.1-fpm \
    php8.1-curl \
    php8.1-zip

COPY --from=composer:latest  /usr/bin/composer /usr/bin/composer