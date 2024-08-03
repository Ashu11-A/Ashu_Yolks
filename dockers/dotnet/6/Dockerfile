ARG REPO=mcr.microsoft.com/dotnet/aspnet
FROM $REPO:6.0.13-bullseye-slim

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

ENV         DOCKER_PLATFORMS=linux/amd64,linux/armhf,linux/arm64
ENV         DEBIAN_FRONTEND noninteractive

RUN         dpkg --configure -a
RUN         apt clean
RUN         apt --fix-missing update
RUN         apt update -y
RUN         apt -f install

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        curl \
        bash \
        git \
        wget \
        libsdl2-dev \
        libc6 \
        libgcc1 \
        libgssapi-krb5-2 \
        libstdc++6 \
        zlib1g \
        iproute2 \
    && rm -rf /var/lib/apt/lists/*

RUN         apt upgrade -y
RUN         apt install -y wget
RUN         wget https://dotnet.microsoft.com/download/dotnet/scripts/v1/dotnet-install.sh \
            && bash dotnet-install.sh

ENV         USER=container HOME=/home/container
WORKDIR     /home/container

COPY        ./entrypoint.sh /entrypoint.sh
CMD         [ "/bin/bash", "/entrypoint.sh" ]
