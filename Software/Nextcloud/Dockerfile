FROM alpine:latest

RUN apk --update --no-cache add curl ca-certificates nginx
RUN apk update

ENV NEXTCLOUD_PATH="/home/container/webroot" \
  LD_PRELOAD="/usr/lib/preloadable_libiconv.so"

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

RUN echo "**** Instalação dos PHP ****" && \
    apk add --no-cache --update \
    php8.1 \
    php8.1-apcu \
    php8.1-ctype \
    php8.1-json \
    php8.1-posix \
    php8.1-zlib \
    php8.1-fileinfo \
    php8.1-ftp \
    php8.1-redis \
    php8.1-pcntl \
    php8.1-phar \
    php8.1-dev \
    php8.1-fpm \
    php8.1-dom \
    php8.1-xml \
    php8.1-simplexml \
    php8.1-mbstring \
    php8.1-xmlwriter \
    php8.1-xmlreader \
    php8.1-pdo_mysql \
    php8.1-mysqli \
    php8.1-bcmath \
    php8.1-bz2 \
    php8.1-curl \
    php8.1-gd \
    php8.1-opcache \
    php8.1-gmp \
    php8.1-imap \
    php8.1-intl \
    php8.1-ldap \
    php8.1-sodium \
    php8.1-zip \
    php8.1 \
    php8.1-exif \
    php8.1-session \
    php8.1-soap \
    php8.1-openssl \
    php8.1-pdo_odbc \
    php8.1-pdo \
    php8.1-odbc \
    php8.1-gettext \
    php8.1-iconv \
    php8.1-tokenizer

#RUN  echo "**** compile smbclient ****" && \
#  git clone https://github.com/eduardok/libsmbclient-php.git /tmp/smbclient && \
#  cd /tmp/smbclient && \
#  phpize8 && \
#  ./configure \
#    --with-php-config=/usr/bin/php-config8 && \
#  make && \
#  make install && \
#  echo "**** cleanup ****" && \
#  apk del --purge \
#    build-dependencies && \
#  rm -rf \
#    /tmp/*


COPY --from=composer:latest  /usr/bin/composer /usr/bin/composer

USER container
ENV  USER container
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD ["/bin/ash", "/entrypoint.sh"]
