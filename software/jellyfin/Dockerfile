ARG REPO=mcr.microsoft.com/dotnet/aspnet
FROM $REPO:8.0.3-bookworm-slim

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

ENV DOCKER_PLATFORMS=linux/amd64,linux/armhf,linux/arm64
ENV DEBIAN_FRONTEND noninteractive

ARG VERSION_OS="$( awk -F'=' '/^ID=/{ print $NF }' /etc/os-release )"
ARG VERSION_CODENAME="$( awk -F'=' '/^VERSION_CODENAME=/{ print $NF }' /etc/os-release )"
ARG DPKG_ARCHITECTURE="$( dpkg --print-architecture )"

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
      wget \
      curl \
      ffmpeg \
      locales \
      iproute2 \
      gnupg \
      software-properties-common

RUN add-apt-repository universe \
    && apt update \
    && mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://repo.jellyfin.org/jellyfin_team.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/jellyfin.gpg \
    && apt update \
    && apt install -y jellyfin-ffmpeg

RUN  dpkg --configure -a
RUN  apt clean
RUN  apt --fix-missing update
RUN  apt update -y
RUN  apt -f install


RUN wget https://dotnet.microsoft.com/download/dotnet/scripts/v1/dotnet-install.sh \
    && bash dotnet-install.sh

RUN   echo "**** cleanup ****" && \
  rm -rf \
    /tmp/* \
    /var/lib/apt/lists/* \
    /var/tmp/*

## Configure locale.
RUN update-locale lang=en_US.UTF-8 \
    && dpkg-reconfigure --frontend noninteractive locales


ENV USER=container HOME=/home/container
WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh
CMD [ "/bin/bash", "/entrypoint.sh" ]
