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


RUN apk update && apk add --no-cache \
    sudo \
    iptables \
    coreutils \
    gnupg \
    device-mapper \
    e2fsprogs \
    xfsprogs \
    shadow

ENV TZ="America/Sao_Paulo"

# Remove o link simbólico para o shell padrão e cria um novo link simbólico para o bash
RUN apk add --no-cache bash fakeroot
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN echo "America/Sao_Paulo" > /etc/timezone

# Create a new user to run Docker as
ARG USER_NAME=pterodactyl
ARG USER_UID=1000
ARG USER_GID=1000
RUN addgroup -g ${USER_GID} ${USER_NAME} && \
    adduser -u ${USER_UID} -G ${USER_NAME} -s /bin/sh -D ${USER_NAME} && \
    echo "${USER_NAME} ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

USER ${USER_NAME}

RUN curl -sSL https://get.docker.com/rootless | sh

ENV DOCKER_HOST=unix:///run/user/1000/docker.sock
ENV DOCKER_TLS_CERTDIR=/run/user/1000/certs

RUN docker network create pterodactyl_nw

ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD [ "bash", "/entrypoint.sh" ]