FROM docker:dind

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apk update && apk add --no-cache --upgrade \
    file \
    git \
    wget \
    jq \
    tar \
    unzip \
    curl \
    tzdata \
    ca-certificates \
    iptables \
    docker-cli \
    bash \
    fakeroot \
    && rm /bin/sh \
    && ln -s /bin/bash /bin/sh \
    && echo "America/Sao_Paulo" > /etc/timezone

RUN adduser --disabled-password --home /home/container --uid 1000 pterodactyl && \
    addgroup --gid 1001 docker && \
    adduser pterodactyl docker && \
    touch /var/run/docker.sock && \
    chown pterodactyl:docker /var/run/docker.sock && \
    chmod g+rwx /var/run/docker.sock

USER pterodactyl
ENV USER=pterodactyl
ENV HOME=/home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD ["bash", "/entrypoint.sh"]