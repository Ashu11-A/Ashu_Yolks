FROM alpine:latest

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apk update

RUN adduser --disabled-password --home /home/user --uid 1000 pterodactyl

RUN apk add --no-cache --virtual=build-dependencies --upgrade \
    file \
    git \
    wget \
    jq \
    tar \
    unzip \
    curl \
    tzdata \
    ca-certificates \
    iptables

RUN apk add --update docker openrc
RUN rc-update add docker boot

RUN addgroup docker

RUN adduser pterodactyl docker

RUN chown root:docker /var/run/docker.sock && \
    chmod 660 /var/run/docker.sock

ENV TZ="America/Sao_Paulo"

ENV DOCKER_HOST=tcp://host.docker.internal:53

# Remove o link simbólico para o shell padrão e cria um novo link simbólico para o bash
RUN apk add --no-cache bash fakeroot
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN echo "America/Sao_Paulo" > /etc/timezone

USER pterodactyl
ENV  USER pterodactyl
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD [ "bash", "/entrypoint.sh" ]