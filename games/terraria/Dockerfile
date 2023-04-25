FROM alpine:latest

RUN apk update

RUN apk add --no-cache --upgrade \
    iproute2 curl coreutils
#tzdata
RUN apk add --no-cache libfaketime --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing

RUN apk add --no-cache mono --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing


## configure locale
RUN echo "America/Sao_Paulo" >  /etc/timezone

#ENV TZ America/Sao_Paulo
ENV LANG pt_BR.UTF-8
ENV LANGUAGE pt_BR.UTF-8
ENV LC_ALL pt_BR.UTF-8

# Esse codigo o Drylian me passou
# Instala o bash
RUN apk add --no-cache --upgrade bash

# Remove o link simbólico para o shell padrão e cria um novo link simbólico para o bash
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

ENV LD_PRELOAD=/usr/lib/faketime/libfaketimeMT.so.1
ENV FAKETIME_NO_CACHE=1
ENV FAKETIME_TIMESTAMP_FILE=/etc/faketimerc
ENV DONT_FAKE_MONOTONIC="1"

USER container
ENV  USER container
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD ["/bin/bash", "/entrypoint.sh"]
