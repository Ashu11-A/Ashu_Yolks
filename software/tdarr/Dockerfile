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
 apt-get -y install software-properties-common wget unzip

RUN \
 echo "**** install HandBrakeCLI package ****" && \
 apt-get update && \
 apt-get -y install handbrake-cli

RUN \
 echo "**** install ffmpeg package ****" && \
 apt-get -y install ffmpeg

RUN \
 cd /home/container  && \
 echo "**** install tdarr package ****"  && \
 bash -c 'arch=$(dpkg --print-architecture); if [ "$arch" = "amd64" ]; then arch="x64"; fi; wget https://f000.backblazeb2.com/file/tdarrs/versions/2.00.15/linux_$arch/Tdarr_Updater.zip' && \
 unzip Tdarr_Updater.zip && \
 ./Tdarr_Updater

EXPOSE 8265 8266 8267
VOLUME ["/home/container/configs", "/home/container/logs", "/home/container/server"]
WORKDIR /home/container
COPY  ./entrypoint.sh /entrypoint.sh
CMD   [ "/bin/bash", "/entrypoint.sh" ]