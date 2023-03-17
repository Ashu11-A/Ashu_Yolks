FROM alpine:3.14

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apk update

RUN apk add --no-cache --upgrade \
    file \
    git \
    wget \
    jq \
    tar \
    unzip \
    curl \
    tzdata \
    ca-certificates

RUN apk update && apk add --no-cache uidmap

ENV TZ="America/Sao_Paulo"

# Remove o link simbólico para o shell padrão e cria um novo link simbólico para o bash
RUN apk add --no-cache bash fakeroot
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN echo "America/Sao_Paulo" > /etc/timezone

RUN adduser -D pterodactyl

USER pterodactyl

RUN curl -fsSL https://get.docker.com/rootless | sh

ENV DOCKER_HOST=unix:///run/user/1000/docker.sock
ENV DOCKER_TLS_CERTDIR=/run/user/1000/certs

RUN docker network create pterodactyl_nw

ENV  USER pterodactyl
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD [ "bash", "/entrypoint.sh" ]