FROM alpine:latest

## add container user
RUN useradd -m -d /home/container container
ENV USER=container HOME=/home/container

RUN apk update

RUN apk add --no-cache --upgrade \
    gcc g++ libgcc libc-dev gdb libc6-compat git wget curl tar zip unzip binutils xz lzo cabextract iproute2 net-tools netcat-openbsd busybox-extras libatomic sdl2 \
    fontconfig icu-libs icu-dev libunwind libssl1.0 libssl1.0 sqlite sqlite-dev mariadb-dev duktape libzip tzdata ffmpeg \
    gnutls jsoncpp leveldb lua-dev luajit-dev sqlite-libs fluidsynth bzip2 zlib-dev libevent-dev mono

## wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub
## wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.35-r0/glibc-2.35-r0.apk
## apk add glibc-2.35-r0.apk

## configure locale
RUN echo "America/Sao_Paulo" >  /etc/timezone

ENV TZ America/Sao_Paulo
ENV LANG pt_BR.UTF-8
ENV LANGUAGE pt_BR.UTF-8
ENV LC_ALL pt_BR.UTF-8

# Esse codigo o Drylian me passou
# Instala o bash
RUN apk add --no-cache --upgrade bash

# Remove o link simbólico para o shell padrão e cria um novo link simbólico para o bash
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
 
## Test stuff
# RUN ln -sf /.local/share/Terraria /home/container

USER container
ENV  USER container
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD ["/bin/bash", "/entrypoint.sh"]