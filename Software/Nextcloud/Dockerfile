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
    php \
    php-apcu \
    php-ctype \
    php-json \
    php-posix \
    php-zlib \
    php-fileinfo \
    php-ftp \
    php-redis \
    php-pcntl \
    php-phar \
    php-dev \
    php-fpm \
    php-dom \
    php-xml \
    php-simplexml \
    php-mbstring \
    php-xmlwriter \
    php-xmlreader \
    php-pdo_mysql \
    php-mysqli \
    php-bcmath \
    php-bz2 \
    php-curl \
    php-gd \
    php-opcache \
    php-gmp \
    php-imap \
    php-intl \
    php-ldap \
    php-sodium \
    php-zip \
    php \
    php-exif \
    php-session \
    php-soap \
    php-openssl \
    php-pdo_odbc \
    php-pdo \
    php-odbc \
    php-gettext \
    php-iconv \
    php-tokenizer

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
