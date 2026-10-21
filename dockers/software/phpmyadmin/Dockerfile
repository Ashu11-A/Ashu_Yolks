FROM alpine:3.24

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

# Aliases faceis: php e php-fpm (corrige "php: command not found" quando o binario e phpXX)
RUN ln -sf /usr/bin/php${PHP_VERSION} /usr/bin/php \
    && ln -sf /usr/bin/php${PHP_VERSION} /usr/local/bin/php \
    && ln -sf /usr/sbin/php-fpm${PHP_VERSION} /usr/sbin/php-fpm \
    && ln -sf /usr/sbin/php-fpm${PHP_VERSION} /usr/bin/php-fpm \
    && ln -sf /usr/sbin/php-fpm${PHP_VERSION} /usr/local/bin/php-fpm \
    && php -v && php-fpm -v

ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    USER=container \
    HOME=/home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh
CMD ["/bin/bash", "/entrypoint.sh"]