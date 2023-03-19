ARG REPO=mcr.microsoft.com/dotnet/aspnet
FROM $REPO:6.0-alpine

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

ENV         DOCKER_PLATFORMS=linux/amd64,linux/armhf,linux/arm64

RUN apk update \
    && apk add --no-cache --upgrade \
        curl \
        git \
        wget \
        sdl2-dev \
        libc6-compat \
        libgcc \
        krb5-libs \
        libstdc++6 \
        zlib-dev \
        iproute2

RUN         apk update

RUN         wget https://dotnet.microsoft.com/download/dotnet/scripts/v1/dotnet-install.sh \
            && bash dotnet-install.sh

ENV         USER=container HOME=/home/container
WORKDIR     /home/container

COPY        ./entrypoint.sh /entrypoint.sh
CMD         [ "/bin/bash", "/entrypoint.sh" ]
