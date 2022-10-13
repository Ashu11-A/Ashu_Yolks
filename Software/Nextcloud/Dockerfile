FROM alpine:latest

RUN apk --update --no-cache add curl ca-certificates nginx
RUN apk add php8 php8-xml php8-exif php8-fpm php8-session php8-soap php8-openssl php8-gmp php8-pdo_odbc php8-json php8-dom php8-pdo php8-zip php8-mysqli php8-bcmath php8-gd php8-odbc
RUN apk update
RUN apk add php8 php8-xml php8-exif php8-fpm php8-session php8-soap php8-openssl php8-gmp php8-pdo_odbc php8-json php8-dom php8-pdo php8-zip php8-mysqli php8-bcmath php8-gd php8-odbc php8-pdo_mysql php8-gettext php8-xmlreader  php8-bz2 php8-iconv php8-curl php8-ctype php8-phar php8-fileinfo php8-mbstring php8-tokenizer

ENV NEXTCLOUD_PATH="/home/container/webroot" \
  LD_PRELOAD="/usr/lib/preloadable_libiconv.so"

RUN apk add --update \
    curl \
    ffmpeg \
    imagemagick \
    libxml2 \
    php8 \
    php8-ldap \
    file \
    re2c \
    samba-dev \
    zlib-dev \
    gnu-libiconv \
    samba-client \
    sudo \
    imagemagick \
    libxml2 \
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
    git \
    gpg \
    tar \
    unzip \
    autoconf \
    automake \
    file \
    g++ \
    gcc \
    make \
    re2c \
    php8-fpm \
    php8-dom \
    php8-xml \
    php8-simplexml \
    php8-mbstring \
    php8-xmlwriter \
    php8-xmlreader \
    php8-pdo_mysql

RUN apk add --update \
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
    php8-dev

RUN  echo "**** compile smbclient ****" && \
  git clone https://github.com/eduardok/libsmbclient-php.git /tmp/smbclient && \
  cd /tmp/smbclient && \
  phpize && \
  ./configure \
    --with-php-config=/usr/bin/php-config && \
  make && \
  make install

COPY --from=composer:latest  /usr/bin/composer /usr/bin/composer

USER container
ENV  USER container
ENV HOME /home/container

WORKDIR /home/container
COPY ./entrypoint.sh /entrypoint.sh


CMD ["/bin/ash", "/entrypoint.sh"]
