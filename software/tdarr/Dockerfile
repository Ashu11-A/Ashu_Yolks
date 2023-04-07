FROM ubuntu:20.04

# set version label
ARG BUILD_DATE
ARG VERSION
LABEL build_version="tdarr-v2-aio version:- ${VERSION} Build-date:- ${BUILD_DATE}"
LABEL maintainer="chalkley"

RUN \
useradd -m -d /home/container -s /bin/bash container

RUN \
 echo "**** install core packages ****" && \
 apt-get update && \
 DEBIAN_FRONTEND=noninteractive TZ=Etc/UTC apt-get -y install tzdata && \
 apt-get -y install software-properties-common curl wget unzip figlet git cat gem rubygems && \
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
WORKDIR /home/container
COPY  ./entrypoint.sh /entrypoint.sh
CMD   [ "/bin/bash", "/entrypoint.sh" ]