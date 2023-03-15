FROM alpine:latest

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

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

RUN echo "**** Instalação dos php7 ****" && \
    apk add --no-cache --update \
    php7 \
    php7-apcu \
    php7-ctype \
    php7-json \
    php7-posix \
    php7-zlib \
    php7-fileinfo \
    php7-ftp \
    php7-redis \
    php7-pcntl \
    php7-phar \
    php7-dev \
    php7-fpm \
    php7-dom \
    php7-xml \
    php7-simplexml \
    php7-mbstring \
    php7-xmlwriter \
    php7-xmlreader \
    php7-pdo_mysql \
    php7-mysqli \
    php7-bcmath \
    php7-bz2 \
    php7-curl \
    php7-gd \
    php7-opcache \
    php7-gmp \
    php7-imap \
    php7-intl \
    php7-ldap \
    php7-sodium \
    php7-zip \
    php7-exif \
    php7-session \
    php7-soap \
    php7-openssl \
    php7-pdo_odbc \
    php7-pdo \
    php7-odbc \
    php7-gettext \
    php7-iconv \
    php7-tokenizer

#RUN  echo "**** compile smbclient ****" && \
#  git clone https://github.com/eduardok/libsmbclient-php7.git /tmp/smbclient && \
#  cd /tmp/smbclient && \
#  php7ize8 && \
#  ./configure \
#    --with-php7-config=/usr/bin/php7-config8 && \
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
