ARG REPO=mcr.microsoft.com/dotnet/aspnet
FROM $REPO:8.0.3-bookworm-slim

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

ENV DOCKER_PLATFORMS=linux/amd64,linux/armhf,linux/arm64
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
      wget \
      curl \
      ffmpeg \
      locales \
      iproute2 \
      gnupg \
      software-properties-common \
      libllvm16 \
      ca-certificates \
      nginx \
      git

SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN arch=$(arch | sed s/aarch64/arm64/ | sed s/x86_64/amd64/) && \
    wget -q -O /tmp/jellyfin-ffmpeg.deb "https://repo.jellyfin.org/files/ffmpeg/debian/latest-6.x/${arch}/jellyfin-ffmpeg6_6.0.1-7-bookworm_${arch}.deb" \
    && dpkg -i /tmp/jellyfin-ffmpeg.deb \
    && rm /tmp/jellyfin-ffmpeg.deb
  

RUN  dpkg --configure -a
RUN  apt clean
RUN  apt --fix-missing update
RUN  apt update -y
RUN  apt -f install


RUN wget https://dotnet.microsoft.com/download/dotnet/scripts/v1/dotnet-install.sh \
    && bash dotnet-install.sh

RUN   echo "**** cleanup ****" && \
  rm -rf \
    /tmp/* \
    /var/lib/apt/lists/* \
    /var/tmp/*

## Configure locale.
RUN update-locale lang=en_US.UTF-8 \
    && dpkg-reconfigure --frontend noninteractive locales


ENV USER=container HOME=/home/container
WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh
CMD [ "/bin/bash", "/entrypoint.sh" ]
