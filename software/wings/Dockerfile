FROM docker:dind

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apk update

RUN adduser --disabled-password --home /home/container --uid 1000 pterodactyl

RUN apk add --no-cache --upgrade \
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

RUN apk add --update docker-cli

RUN touch /var/run/docker.sock
RUN chown pterodactyl:pterodactyl /var/run/docker.sock && \
    chmod 660 /var/run/docker.sock

ENV TZ="America/Sao_Paulo"
ENV DOCKER_TLS_CERTDIR=""
ENV DOCKER_HOST=tcp://docker:2375
ENV DOCKER_HOST=unix:///var/run/docker.sock

# Remove o link simbólico para o shell padrão e cria um novo link simbólico para o bash
RUN apk add --no-cache bash fakeroot
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN echo "America/Sao_Paulo" > /etc/timezone

# Cria a rede pterodactyl_nw com driver bridge
RUN docker network create --driver bridge pterodactyl_nw

USER pterodactyl
ENV  USER pterodactyl
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD [ "bash", "/entrypoint.sh" ]