FROM php:8.1-rc-fpm-alpine

RUN apk --update --no-cache add curl ca-certificates nginx gnupg  &&   update-ca-certificates
RUN apk update

ENV LD_PRELOAD="/usr/lib/preloadable_libiconv.so"

RUN apk add --upgrade \
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

RUN  apk add --upgrade \
    gnu-libiconv \
    imagemagick \
    libxml2 \
    tar \
    unzip \
    curl \
    libzip-dev \
    nano

RUN echo "**** Instalação dos PHP ****" && \
    docker-php-ext-install cli \
    docker-php-ext-install gd \
    docker-php-ext-install pdo \
    docker-php-ext-install mbstring \
    docker-php-ext-install tokenizer \
    docker-php-ext-install bcmath \
    docker-php-ext-install xml \
    docker-php-ext-install fpm \
    docker-php-ext-install url \
    docker-php-ext-install zip \
    docker-php-ext-install intl \
    docker-php-ext-install fileinfo \
    docker-php-ext-install session \
    docker-php-ext-install redis

COPY --from=composer:latest  /usr/bin/composer /usr/bin/composer

RUN docker-php-ext-install mysqli && \
    docker-php-ext-install pdo && \
    docker-php-ext-install pdo_mysql && \
    docker-php-ext-install zip

RUN docker-php-ext-enable mysqli && \
    docker-php-ext-enable pdo && \
    docker-php-ext-enable pdo_mysql && \
    docker-php-ext-enable sodium

RUN apk add bash
RUN sed -i 's/bin\/ash/bin\/bash/g' /etc/passwd

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

CMD ["/bin/ash", "/entrypoint.sh"]
