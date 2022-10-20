FROM debian:latest

ENV NVIDIA_DRIVER_CAPABILITIES="compute,video,utility"
ENV         DEBIAN_FRONTEND noninteractive

RUN         apt update -y \
            && apt upgrade -y \
            && apt install -y apt-transport-https wget iproute2 \
            && wget https://packages.microsoft.com/config/debian/11/packages-microsoft-prod.deb -O packages-microsoft-prod.deb \
            && dpkg -i packages-microsoft-prod.deb \
            && rm packages-microsoft-prod.deb \
            && apt update -y \
            && apt install -y aspnetcore-runtime-6.0 libgdiplus



## Update base packages
RUN          apt update \
             && apt upgrade -y

RUN \
  echo "**** install packages ****" && \
  apt-get update && \
  apt-get install -y \
    cpio \
    jq \
    rpm2cpio

RUN \
  echo "**** install packages ****" && \
  apt-get update && \
  apt-get install -y --no-install-recommends \
    mesa-va-drivers \
    netcat && \
  echo "**** cleanup ****" && \
  rm -rf \
    /tmp/* \
    /var/lib/apt/lists/* \
    /var/tmp/*

## Install dependencies
RUN          apt update && apt upgrade -y
RUN          apt install -y git wget curl tar zip unzip binutils xz-utils cabextract iproute2 net-tools netcat telnet \
             icu-devtools sqlite3 locales ffmpeg gnupg2 apt-transport-https software-properties-common ca-certificates \
             tzdata libsqlite3-0 libfontconfig1 libfreetype6 libsqlite3-dev

RUN apt install -y build-essential

RUN wget https://www.sqlite.org/2022/sqlite-autoconf-3390400.tar.gz && \
    mkdir SQLite && cd SQLite && \
    tar xvfz ../sqlite-autoconf-3390400.tar.gz && cd sqlite-autoconf-3390400 && \
    ./configure && \
    make && \
    make install && \
    sqlite3 --version

## Configure locale
RUN          update-locale lang=en_US.UTF-8 \
             && dpkg-reconfigure --frontend noninteractive locales

WORKDIR     /home/container

COPY        ./entrypoint.sh /entrypoint.sh
CMD         [ "/bin/bash", "/entrypoint.sh" ]
