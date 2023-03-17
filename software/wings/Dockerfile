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

# Configura o driver devicemapper
RUN sed -i '/^ExecStart/ s/$/ --storage-driver=devicemapper/' /lib/systemd/system/docker.service
RUN mkdir /etc/docker
RUN printf "{\n    \"storage-driver\": \"devicemapper\",\n    \"storage-opts\": [\n        \"dm.directlvm_device=/dev/sda1\",\n        \"dm.directlvm_device_force=true\"\n    ]\n}\n" > /etc/docker/daemon.json

# Inicia o daemon Docker dentro do contêiner
RUN dockerd --host=unix:///var/run/docker.sock --host=tcp://0.0.0.0:2375 --log-driver=json-file --log-opt=max-size=10m --log-opt=max-file=5

RUN docker network create --driver bridge pterodactyl_nw

USER pterodactyl
ENV USER=pterodactyl
ENV HOME=/home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD ["bash", "/entrypoint.sh"]