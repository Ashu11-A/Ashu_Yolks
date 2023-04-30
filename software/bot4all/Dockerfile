FROM alpine:latest

RUN apk update

RUN apk add --no-cache --upgrade \
    iproute2 tzdata curl coreutils

RUN apk add --no-cache \
    git jq file unzip make gcc g++ python3 python3-dev \
    libtool nodejs nodejs-lts ffmpeg wget py3-pip ncurses

ENV NVM_DIR /usr/local/bin/

# Esse codigo o Drylian me passou.
# Instala o bash
RUN apk add --no-cache --upgrade bash

# Remove o link simbólico para o shell padrão e cria um novo link simbólico para o bash
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.39.3/install.sh | bash

# install node and npm
RUN source $NVM_DIR/nvm.sh \
    && nvm install 18 \
    && nvm use 18

## configure locale
RUN echo "America/Sao_Paulo" >  /etc/timezone

ENV TZ America/Sao_Paulo
ENV LANG pt_BR.UTF-8
ENV LANGUAGE pt_BR.UTF-8
ENV LC_ALL pt_BR.UTF-8

RUN adduser --disabled-password --home /home/ --uid 1000 container
RUN chown -R container:container /home/*

USER container
ENV  USER container
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD ["/bin/bash", "/entrypoint.sh"]