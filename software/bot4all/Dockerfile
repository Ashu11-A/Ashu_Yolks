FROM        node:18-bullseye-slim

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apt update \
    && apt -y upgrade
RUN dpkg --configure -a \
    && apt-get install -f

RUN DEBIAN_FRONTEND=noninteractive TZ=Etc/UTC apt-get -y install tzdata

# Set debconf to run non-interactively
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections

# Install base dependencies
RUN apt-get update && apt-get install -y -q --no-install-recommends \
        build-essential jq unzip \
        apt-transport-https file \
        ca-certificates iproute2 figlet \
        git tesseract-ocr lolcat \
        curl tzdata ffmpeg wget \
        libgconf-2-4 libatk1.0-0 \
        libatk-bridge2.0-0 libgdk-pixbuf2.0-0 \
        libgtk-3-0 libgbm-dev \
        libnss3-dev libxss-dev \
    && rm -rf /var/lib/apt/lists/*

RUN apt update && apt -y install \
        sqlite3 libsqlite3-dev python3 \
        python3-dev dnsutils zip tar libtool \
        iputils-ping \
            && useradd -m -d /home/container container
            
RUN         npm install npm@latest -g

USER        container
ENV         USER=container HOME=/home/container
WORKDIR     /home/container

COPY        ./entrypoint.sh /entrypoint.sh
CMD         [ "/bin/bash", "/entrypoint.sh" ]
