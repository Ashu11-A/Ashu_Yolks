ARG REPO=mcr.microsoft.com/dotnet/aspnet
FROM $REPO:6.0.9-jammy

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


ENV          DEBIAN_FRONTEND noninteractive

RUN          useradd -m -d /home/container -s /bin/bash container

RUN          ln -s /home/container/ /nonexistent

ENV          USER=container HOME=/home/container

## Update base packages
RUN          apt update \
             && apt upgrade -y

## Install dependencies
RUN          apt install -y git wget curl tar zip unzip binutils xz-utils cabextract iproute2 net-tools netcat telnet \
             icu-devtools sqlite3 locales ffmpeg gnupg2 apt-transport-https software-properties-common ca-certificates \
             tzdata libsqlite3-0 libfontconfig1 libfreetype6

RUN          apt install curl gnupg \
             && curl -fsSL https://repo.jellyfin.org/ubuntu/jellyfin_team.gpg.key | gpg --dearmor -o /etc/apt/trusted.gpg.d/jellyfin.gpg \
             && echo "deb [arch=$( dpkg --print-architecture )] https://repo.jellyfin.org/$( awk -F'=' '/^ID=/{ print $NF }' /etc/os-release ) $( awk -F'=' '/^VERSION_CODENAME=/{ print $NF }' /etc/os-release ) main" | tee /etc/apt/sources.list.d/jellyfin.list \
             && apt update \
             && apt install jellyfin-ffmpeg


## Configure locale
RUN          update-locale lang=en_US.UTF-8 \
             && dpkg-reconfigure --frontend noninteractive locales


WORKDIR     /home/container

COPY        ./entrypoint.sh /entrypoint.sh
CMD         [ "/bin/bash", "/entrypoint.sh" ]
