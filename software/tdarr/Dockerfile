FROM ubuntu:20.04

# set version label
ARG BUILD_DATE
ARG VERSION
LABEL build_version="tdarr-v2-aio version:- ${VERSION} Build-date:- ${BUILD_DATE}"
LABEL maintainer="chalkley"

RUN \
 echo "**** install core packages ****" && \
 apt-get update && \
 apt-get -y install software-properties-common wget unzip && \
 echo "**** install HandBrakeCLI package ****" && \
 add-apt-repository ppa:stebbins/handbrake-releases && \
 apt-get update && \
 apt-get -y install handbrake-cli && \
 echo "**** install ffmpeg package ****" && \
 apt-get -y install ffmpeg && \
 echo "**** install tdarr package ****" && \
 cd /opt/tdarr  && \
 wget "https://f000.backblazeb2.com/file/tdarrs/versions/2.00.15/linux_$( dpkg --print-architecture )/Tdarr_Updater.zip" && \
 unzip Tdarr_Updater.zip && \
 ./Tdarr_Updater

EXPOSE 8265 8266 8267
VOLUME ["/opt/tdarr/configs", "/opt/tdarr/logs", "/opt/tdarr/server"]
COPY  ./entrypoint.sh /entrypoint.sh
CMD   [ "/bin/bash", "/entrypoint.sh" ]