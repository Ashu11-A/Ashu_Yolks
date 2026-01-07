ARG REPO=mcr.microsoft.com/dotnet/aspnet
FROM $REPO:9.0-bookworm-slim

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
  wget \
  curl \
  git \
  locales \
  iproute2 \
  gnupg \
  software-properties-common \
  ca-certificates \
  nginx \
  xz-utils \
  tar \
  # for jellyfin-ffmpeg 
  ocl-icd-libopencl1 \ 
  && rm -rf /var/lib/apt/lists/*

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN arch=$(arch | sed s/aarch64/arm64/ | sed s/x86_64/amd64/) && \
  REPO_URL="https://repo.jellyfin.org/files/ffmpeg/debian/latest-7.x/${arch}/" && \
  LATEST_FILE=$(curl -sL "${REPO_URL}" | grep -oE "jellyfin-ffmpeg[0-9]*_[0-9.]+-[0-9]+-bookworm_${arch}\.deb" | sort -V | tail -n 1) && \
  if [ -z "$LATEST_FILE" ]; then echo "ERRO: Arquivo não encontrado no repo"; exit 1; fi && \
  echo "Downloading ${LATEST_FILE}..." && \
  wget -q -O /tmp/jellyfin-ffmpeg.deb "${REPO_URL}${LATEST_FILE}" && \
  apt-get update && \
  apt-get install -y /tmp/jellyfin-ffmpeg.deb && \
  rm /tmp/jellyfin-ffmpeg.deb

ENV LC_ALL=en_US.UTF-8
ENV LANG=en_US.UTF-8
ENV LANGUAGE=en_US.UTF-8

USER container
ENV USER=container HOME=/home/container
WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh
CMD ["/bin/bash", "/entrypoint.sh"]