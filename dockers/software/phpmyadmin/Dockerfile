FROM alpine:3.20

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apk --update --no-cache add curl ca-certificates nginx \
  && apk update

RUN apk add --no-cache --upgrade \
  file \
  bash \
  re2c \
  libtool \
  git \
  autoconf \
  wget \
  jq \
  tar \
  unzip \
  curl \
  coreutils

RUN apk add --no-cache lolcat figlet --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing

ENV PHP_VERSION="83"

RUN echo "**** Instalação dos PHP ****" && \
  apk add --no-cache --update \
  php${PHP_VERSION} \
  php${PHP_VERSION}-fpm \
  php${PHP_VERSION}-bz2 \
  php${PHP_VERSION}-ctype \
  php${PHP_VERSION}-curl \
  php${PHP_VERSION}-gd \
  php${PHP_VERSION}-iconv \
  php${PHP_VERSION}-zip \
  php${PHP_VERSION}-mysqli \
  php${PHP_VERSION}-openssl \
  php${PHP_VERSION}-mbstring \
  php${PHP_VERSION}-session \
  php${PHP_VERSION}-xmlwriter

ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

USER container
ENV USER=container HOME=/home/container
WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh
CMD ["/bin/bash", "/entrypoint.sh"]