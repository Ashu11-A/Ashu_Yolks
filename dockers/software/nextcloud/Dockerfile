FROM alpine:3.20

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

ENV LD_PRELOAD="/usr/lib/preloadable_libiconv.so"
ENV PHP_VERSION="83"

# Instala dependências de compilação
RUN apk add --no-cache --virtual .build-deps \
        autoconf \
        automake \
        file \
        g++ \
        gcc \
        gpg \
        libtool \
        make \
        re2c \
        samba-dev \
        zlib-dev

# Instala pacotes principais
RUN apk add --no-cache \
        ca-certificates \
        curl \
        ffmpeg \
        git \
        gnu-libiconv \
        icu-dev \
        imagemagick \
        librsvg \
        libgomp \
        libxml2 \
        libzip-dev \
        nginx \
        redis \
        memcached \
        samba-client \
        sudo \
        tar \
        unzip \
        supervisor

# Instala PHP e extensões
RUN echo "**** Instalando pacotes do PHP ${PHP_VERSION} e extensões ****" && \
    apk add --no-cache \
        php${PHP_VERSION} \
        php${PHP_VERSION}-apcu \
        php${PHP_VERSION}-bcmath \
        php${PHP_VERSION}-bz2 \
        php${PHP_VERSION}-ctype \
        php${PHP_VERSION}-curl \
        php${PHP_VERSION}-dom \
        php${PHP_VERSION}-exif \
        php${PHP_VERSION}-fileinfo \
        php${PHP_VERSION}-fpm \
        php${PHP_VERSION}-ftp \
        php${PHP_VERSION}-gd \
        php${PHP_VERSION}-gettext \
        php${PHP_VERSION}-gmp \
        php${PHP_VERSION}-iconv \
        php${PHP_VERSION}-pecl-imagick \
        php${PHP_VERSION}-imap \
        php${PHP_VERSION}-intl \
        php${PHP_VERSION}-json \
        php${PHP_VERSION}-ldap \
        php${PHP_VERSION}-mbstring \
        php${PHP_VERSION}-mysqli \
        php${PHP_VERSION}-opcache \
        php${PHP_VERSION}-openssl \
        php${PHP_VERSION}-pcntl \
        php${PHP_VERSION}-pdo_mysql \
        php${PHP_VERSION}-pdo_pgsql \
        php${PHP_VERSION}-pdo_sqlite \
        php${PHP_VERSION}-phar \
        php${PHP_VERSION}-posix \
        php${PHP_VERSION}-redis \
        php${PHP_VERSION}-pecl-memcached \
        php${PHP_VERSION}-session \
        php${PHP_VERSION}-simplexml \
        php${PHP_VERSION}-soap \
        php${PHP_VERSION}-sodium \
        php${PHP_VERSION}-sysvsem \
        php${PHP_VERSION}-tokenizer \
        php${PHP_VERSION}-xml \
        php${PHP_VERSION}-xmlreader \
        php${PHP_VERSION}-xmlwriter \
        php${PHP_VERSION}-zip \
        php${PHP_VERSION}-zlib

RUN echo "http://dl-cdn.alpinelinux.org/alpine/v3.20/community" >> /etc/apk/repositories && \
    echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache figlet lolcat

# Remove dependências de compilação
RUN apk del .build-deps

# Configurações customizadas do PHP.
COPY uploads.ini /etc/php${PHP_VERSION}/conf.d/98-uploads.ini
COPY opcache.ini /etc/php${PHP_VERSION}/conf.d/99-opcache.ini

# Copia o Composer
COPY --from=composer:latest  /usr/bin/composer /usr/bin/composer

# Cria um link simbólico para o php-fpm
RUN ln -s /usr/sbin/php-fpm${PHP_VERSION} /usr/sbin/php-fpm

USER container
ENV  USER container
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD ["/bin/ash", "/entrypoint.sh"]