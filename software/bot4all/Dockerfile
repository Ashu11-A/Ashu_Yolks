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
    libatk-bridge2.0-0 libgdk-pixbuf2.0-0 libgbm-dev \
    libnss3-dev libxss-dev \
    gconf-service \
    libasound2 gnupg \
    libc6 libcairo2 libcups2 \
    libdbus-1-3 libexpat1 libfontconfig1 \
    libgcc1 \
    libglib2.0-0 libgtk-3-0 libnspr4 \
    libpango-1.0-0 libpangocairo-1.0-0 \
    libstdc++6 libx11-6 libx11-xcb1 libxcb1 \
    libxcomposite1 libxcursor1 libxdamage1 \
    libxext6 libxfixes3 libxi6 libxrandr2 \
    libxrender1 libxss1 libxtst6 \
    fonts-liberation libappindicator1 libnss3 \
    lsb-release xdg-utils \
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
