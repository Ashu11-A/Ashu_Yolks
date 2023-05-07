FROM node:18-bullseye-slim

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
        jq unzip iproute2 figlet \
        lolcat curl  \
    && rm -rf /var/lib/apt/lists/*

RUN apt update && apt -y install \
        build-essential nginx-full php8.1-fpm php8.1 sqlite3 php8.1-sqlite3 \
        php8.1-curl git php8.1-cli php8.1-lz4 \
        php8.1-mcrypt php8.1-mysql php8.1-xdebug php8.1-zip \
        php8.1-common php8.1-readline php8.1-bcmath php8.1-common php8.1-xml
            
RUN         npm install npm@latest -g

USER        container
ENV         USER=container HOME=/home/container
WORKDIR     /home/container

COPY        ./entrypoint.sh /entrypoint.sh
CMD         [ "/bin/bash", "/entrypoint.sh" ]
