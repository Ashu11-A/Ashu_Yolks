ARG REPO=mcr.microsoft.com/dotnet/aspnet
FROM $REPO:6.0.10-bullseye-slim

ENV         DOCKER_PLATFORMS=linux/amd64,linux/armhf,linux/arm64

ENV         DEBIAN_FRONTEND noninteractive

ENV          DEBIAN_FRONTEND noninteractive

RUN          useradd -m -d /home/container -s /bin/bash container

RUN          ln -s /home/container/ /nonexistent

ENV          USER=container HOME=/home/container

## Update base packages
RUN          apt update \
             && apt upgrade -y

RUN apt-get update \
    && apt-get install -y --no-install-recommends -y --no-install-recommends \
        curl \
        git \
        gnupg gnupg1 gnupg2


ENV          DEBIAN_FRONTEND noninteractive

RUN          useradd -m -d /home/container -s /bin/bash container

RUN          ln -s /home/container/ /nonexistent

ENV          USER=container HOME=/home/container

## Update base packages
RUN          apt update \
             && apt upgrade -y

## Install dependencies
RUN          apt install -y git wget curl ffmpeg

RUN          apt install curl gnupg \
             && curl -fsSL https://repo.jellyfin.org/ubuntu/jellyfin_team.gpg.key | gpg --dearmor -o /etc/apt/trusted.gpg.d/jellyfin.gpg \
             && echo "deb [arch=$( dpkg --print-architecture )] https://repo.jellyfin.org/$( awk -F'=' '/^ID=/{ print $NF }' /etc/os-release ) $( awk -F'=' '/^VERSION_CODENAME=/{ print $NF }' /etc/os-release ) main" | tee /etc/apt/sources.list.d/jellyfin.list \
             && apt update \
             && apt install jellyfin-ffmpeg

RUN      dpkg --configure -a && \
         apt clean && \
         apt --fix-missing update && \
         apt -f install && \
         apt upgrade -y


RUN         wget https://dotnet.microsoft.com/download/dotnet/scripts/v1/dotnet-install.sh \
            && bash dotnet-install.sh

RUN   echo "**** cleanup ****" && \
  rm -rf \
    /tmp/* \
    /var/lib/apt/lists/* \
    /var/tmp/*



## Configure locale
RUN          update-locale lang=en_US.UTF-8 \
             && dpkg-reconfigure --frontend noninteractive locales


WORKDIR     /home/container

COPY        ./entrypoint.sh /entrypoint.sh
CMD         [ "/bin/bash", "/entrypoint.sh" ]
