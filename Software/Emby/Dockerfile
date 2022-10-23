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

RUN \
  echo "**** install packages ****" && \
  apt-get install -y \
    cpio \
    jq \
    rpm2cpio && \
    apt-get update && apt-get install -y --no-install-recommends \
        curl \
        git \
        gnupg gnupg1 gnupg2

RUN \
  echo "**** install packages ****" && \
  apt-get install -y --no-install-recommends \
    mesa-va-drivers \
    netcat

RUN \
  echo "**** add emby deps *****" && \
  curl -s https://keyserver.ubuntu.com/pks/lookup?op=get\&search=0x6587ffd6536b8826e88a62547876ae518cbcf2f2 | apt-key add - && \
  echo "deb http://ppa.launchpad.net/ubuntu-raspi2/ppa-nightly/ubuntu focal main">> /etc/apt/sources.list.d/raspbins.list && \
  apt-get update && apt full-upgrade &&  apt -f install && \
  apt-get install -y --no-install-recommends \
    libomxil-bellagio0 \
    libomxil-bellagio-bin

## Install dependencies
RUN          apt update && apt upgrade -y && \
             apt install -y --no-install-recommends wget tar  \
             sqlite3 locales ffmpeg  \
             tzdata libsqlite3-0 libfontconfig1 libfreetype6 libsqlite3-dev

RUN apt install -y build-essential && \
    wget https://www.sqlite.org/2022/sqlite-autoconf-3390400.tar.gz && \
    mkdir SQLite && cd SQLite && \
    tar xvfz ../sqlite-autoconf-3390400.tar.gz && rm ../sqlite-autoconf-3390400.tar.gz && cd sqlite-autoconf-3390400 && \
    ./configure && \
    make && \
    make install && \
    rm -rf ../sqlite-autoconf-3390400 && \
    sqlite3 --version &&  \
    apt autoremove -y build-essential && \
    apt remove -y build-essential

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
