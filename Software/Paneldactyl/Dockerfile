FROM alpine:latest

RUN apk --update --no-cache add curl ca-certificates nginx gnupg
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
    php81 \
    php81-cli \
    php81-gd \
    php81-mysql \
    php81-pdo \
    php81-mbstring \
    php81-tokenizer \
    php81-bcmath \
    php81-xml \
    php81-fpm \
    php81-curl \
    php81-zip \
    redis \
    nano

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

USER container
ENV  USER container
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD ["/bin/ash", "/entrypoint.sh"]
