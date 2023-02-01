FROM php:8.1-rc-fpm-buster

RUN apt-get install -y --no-install-recommends -y curl ca-certificates nginx gnupg  &&   update-ca-certificates
RUN apt-get update

ENV LD_PRELOAD="/usr/lib/preloadable_libiconv.so"

RUN apt-get install -y --no-install-recommends -y \
    file \
    re2c \
    zlib-dev \
    libtool \
    git \
    gpg \
    autoconf \
    automake \
    file \
    wget \
    jq

RUN  apt-get install -y --no-install-recommends -y \
    gnu-libiconv \
    imagemagick \
    libxml2 \
    sudo \
    tar \
    unzip \
    curl \
    libzip-dev

RUN echo "**** Instalação dos PHP ****" && \
    apt-get install -y --no-install-recommends -y \
    php8.1 \
    php8.1-{cli,gd,mysql,pdo,mbstring,tokenizer,bcmath,xml,fpm,curl,zip}

COPY --from=composer:latest  /usr/bin/composer /usr/bin/composer

RUN echo "* * * * * php /home/container/painel/artisan schedule:run >> /dev/null 2>&1" >> /etc/crontabs/root

RUN echo "UTC" > /etc/timezone
RUN apk add --no-cache zip sqlite supervisor

RUN mkdir -p /etc/supervisor.d/
COPY ./supervisord.ini /etc/supervisor.d/supervisord.ini

USER container
ENV  USER container
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD ["/bin/bash", "/entrypoint.sh"]
