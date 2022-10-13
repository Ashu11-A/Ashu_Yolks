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
    php8 \
    php8-apcu \
    php8-ctype \
    php8-json \
    php8-posix \
    php8-zlib \
    php8-fileinfo \
    php8-ftp \
    php8-redis \
    php8-pcntl \
    php8-phar \
    php8-dev \
    php8-fpm \
    php8-dom \
    php8-xml \
    php8-simplexml \
    php8-mbstring \
    php8-xmlwriter \
    php8-xmlreader \
    php8-pdo_mysql \
    php8-mysqli \
    php8-bcmath \
    php8-bz2 \
    php8-curl \
    php8-gd \
    php8-opcache \
    php8-gmp \
    php8-imap \
    php8-intl \
    php8-ldap \
    php8-sodium \
    php8-zip \
    php8 \
    php8-exif \
    php8-session \
    php8-soap \
    php8-openssl \
    php8-pdo_odbc \
    php8-pdo \
    php8-odbc \
    php8-gettext \
    php8-iconv \
    php8-tokenizer

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

ADD cron_nextcloud /cron_nextcloud
ADD script.sh /script.sh
COPY entry.sh /entry.sh
RUN chmod 755 /script.sh /entry.sh
RUN /usr/bin/crontab /cron_nextcloud

COPY --from=composer:latest  /usr/bin/composer /usr/bin/composer

USER container
ENV  USER container
ENV HOME /home/container

WORKDIR /home/container
COPY ./entrypoint.sh /entrypoint.sh


CMD ["/bin/ash", "/entrypoint.sh"]
