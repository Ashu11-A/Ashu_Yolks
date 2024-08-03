FROM alpine:latest

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apk --update --no-cache add curl ca-certificates nginx
RUN apk update
# test
ENV NEXTCLOUD_PATH="/home/container/webroot" \
  LD_PRELOAD="/usr/lib/preloadable_libiconv.so" \
  PHP_VERSION="83"

RUN apk add --no-cache --virtual=build-dependencies --upgrade \
    file \
    re2c \
    samba-dev \
    zlib-dev \
    libtool \
    git \
    gpg \
    autoconf \
    automake \
    file \
    g++ \
    gcc \
    make \
    re2c

RUN  apk add --no-cache --upgrade \
    ffmpeg \
    gnu-libiconv \
    imagemagick \
    libxml2 \
    samba-client \
    sudo \
    tar \
    unzip \
    curl

RUN echo "**** Instalação dos php${PHP_VERSION} ****" && \
    apk add --no-cache --update \
    php${PHP_VERSION} \
    php${PHP_VERSION}-ctype \
    php${PHP_VERSION}-json \
    php${PHP_VERSION}-posix \
    php${PHP_VERSION}-zlib \
    php${PHP_VERSION}-fileinfo \
    php${PHP_VERSION}-ftp \
    php${PHP_VERSION}-pcntl \
    php${PHP_VERSION}-phar \
    php${PHP_VERSION}-fpm \
    php${PHP_VERSION}-dom \
    php${PHP_VERSION}-xml \
    php${PHP_VERSION}-simplexml \
    php${PHP_VERSION}-mbstring \
    php${PHP_VERSION}-xmlwriter \
    php${PHP_VERSION}-xmlreader \
    php${PHP_VERSION}-pdo_mysql \
    php${PHP_VERSION}-mysqli \
    php${PHP_VERSION}-bcmath \
    php${PHP_VERSION}-bz2 \
    php${PHP_VERSION}-curl \
    php${PHP_VERSION}-gd \
    php${PHP_VERSION}-opcache \
    php${PHP_VERSION}-gmp \
    php${PHP_VERSION}-imap \
    php${PHP_VERSION}-intl \
    php${PHP_VERSION}-ldap \
    php${PHP_VERSION}-sodium \
    php${PHP_VERSION}-zip \
    php${PHP_VERSION}-exif \
    php${PHP_VERSION}-session \
    php${PHP_VERSION}-soap \
    php${PHP_VERSION}-openssl \
    php${PHP_VERSION}-pdo_odbc \
    php${PHP_VERSION}-pdo \
    php${PHP_VERSION}-odbc \
    php${PHP_VERSION}-gettext \
    php${PHP_VERSION}-iconv \
    php${PHP_VERSION}-tokenizer

RUN ln -s /usr/sbin/php-fpm${PHP_VERSION} /usr/sbin/php-fpm

COPY --from=composer:latest  /usr/bin/composer /usr/bin/composer

USER container
ENV  USER container
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD ["/bin/ash", "/entrypoint.sh"]