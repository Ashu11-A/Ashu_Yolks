FROM alpine:latest

RUN apk update

RUN apk add --no-cache --upgrade \
    iproute2 tzdata curl \
    git jq file unzip\
    wget ncurses \
    build-base \
    ca-certificates \
    libressl-dev

# Esse codigo o Drylian me passou.
# Instala o bash
RUN apk add --no-cache --upgrade bash

# Remove o link simbólico para o shell padrão e cria um novo link simbólico para o bash
RUN rm /bin/sh && ln -s /bin/bash /bin/sh


# add node and npm to path so the commands are available
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/v$NODE_VERSION/bin:$PATH

## configure locale
RUN echo "America/Sao_Paulo" >  /etc/timezone

ENV TZ America/Sao_Paulo
ENV LANG pt_BR.UTF-8
ENV LANGUAGE pt_BR.UTF-8
ENV LC_ALL pt_BR.UTF-8

USER container
ENV  USER container
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD ["/bin/bash", "/entrypoint.sh"]