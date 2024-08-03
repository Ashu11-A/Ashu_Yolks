ARG REPO=mcr.microsoft.com/dotnet/aspnet
FROM $REPO:8.0.3-bookworm-slim

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

ENV         DOCKER_PLATFORMS=linux/amd64,linux/armhf,linux/arm64
ENV         DEBIAN_FRONTEND noninteractive

RUN          ln -s /home/container/ /nonexistent
ENV          USER=container HOME=/home/container

ENV          DEBIAN_FRONTEND noninteractive
RUN          useradd -m -d /home/container -s /bin/bash container
RUN          ln -s /home/container/ /nonexistent
ENV          USER=container HOME=/home/container

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
	      gnupg \
        ffmpeg \
	      gnupg2 \
        locales \
        tar \
        zip \
        unzip \
    && rm -rf /var/lib/apt/lists/*

RUN dpkg --configure -a && \
      apt clean && \
      apt --fix-missing update && \
      apt -f install && \
      apt upgrade -y

RUN wget https://dotnet.microsoft.com/download/dotnet/scripts/v1/dotnet-install.sh \
    && bash dotnet-install.sh

RUN apt update && apt upgrade -y \
    && apt install -y \
      cec-utils \
      libasound2 \
      libatomic1 \
      libc6 \
      libegl1 \
      libgcc-s1 \
      libpulse0 \
      libstdc++6 \
      binutils \
      xz-utils \
      cabextract \
      iproute2 \
      net-tools \
      telnet \
      icu-devtools \
      sqlite3 \
      locales \
      ffmpeg \
      gnupg2 \
      apt-transport-https software-properties-common ca-certificates \
      tzdata \
      libsqlite3-0 \
      libfontconfig1 \
      libfreetype6 \
      libsqlite3-dev


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
