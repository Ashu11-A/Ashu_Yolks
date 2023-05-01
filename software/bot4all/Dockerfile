FROM        ubuntu:latest

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
        ca-certificates iproute2 figlet\
        git tesseract-ocr libssl-dev lolcat\
        curl tzdata ffmpeg wget openssh-server \
    && rm -rf /var/lib/apt/lists/*

USER        container
ENV         USER=container HOME=/home/container
WORKDIR     /home/container

COPY        ./entrypoint.sh /entrypoint.sh
CMD         [ "/bin/bash", "/entrypoint.sh" ]
