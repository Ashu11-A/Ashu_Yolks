FROM node:18-bullseye-slim

RUN   apt update \
    &&   apt upgrade -y \
    &&   apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    nginx \
    gnupg \
    software-properties-common \
    apt-transport-https  \
    git \
    lolcat \
    figlet \
    fakeroot \
    curl \
    jq \
    tar \
    &&   update-ca-certificates

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
    php8.1-mysql \
    php8.1-pdo \
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
    php8.1-posix \
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

RUN apt-get -qy update \
    && apt-get -qy --no-install-recommends install \
    openssl \
    && apt-get autoremove -yq \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN echo "UTC" > /etc/timezone

RUN npm --global install pnpm
RUN npm --global install turbo

USER        container
ENV         USER=container HOME=/home/container
WORKDIR     /home/container

COPY        ./entrypoint.sh /entrypoint.sh
CMD         [ "/bin/bash", "/entrypoint.sh" ]
