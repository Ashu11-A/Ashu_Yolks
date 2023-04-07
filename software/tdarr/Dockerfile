FROM ubuntu:22.04

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

ENV   DEBIAN_FRONTEND noninteractive

RUN \
 echo "**** install core packages ****" && \
 apt-get update && \
 TZ=Etc/UTC && \
 apt-get -y install tzdata && \
 apt-get -y install software-properties-common curl wget locales unzip figlet git cat gem rubygems && \
  apt-get update && \
 gem install lolcat

RUN \
 echo "**** install HandBrakeCLI package ****" && \
 apt-get update && \
 apt-get -y install handbrake-cli

RUN \
 echo "**** install ffmpeg package ****" && \
 apt-get -y install ffmpeg

VOLUME ["/home/container/configs", "/home/container/logs", "/home/container/server"]

## configure locale
RUN   update-locale lang=en_US.UTF-8 \
        &&   dpkg-reconfigure --frontend noninteractive locales

WORKDIR /home/container

COPY  ./entrypoint.sh /entrypoint.sh
CMD   [ "/bin/bash", "/entrypoint.sh" ]