ARG REPO=mcr.microsoft.com/dotnet/aspnet
FROM $REPO:9.0-bookworm-slim

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"
ENV DOCKER_PLATFORMS=linux/amd64,linux/armhf,linux/arm64
ENV DEBIAN_FRONTEND=noninteractive
ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  wget \
  curl \
  git \
  ffmpeg \
  locales \
  iproute2 \
  gnupg \
  software-properties-common \
  libllvm16 \
  ca-certificates \
  nginx \
  xz-utils \
  tar

SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN arch=$(arch | sed s/aarch64/arm64/ | sed s/x86_64/amd64/) && \
    REPO_URL="https://repo.jellyfin.org/files/ffmpeg/debian/latest-7.x/${arch}/" && \
    LATEST_FILE=$(curl -sL "${REPO_URL}" | grep -oE "jellyfin-ffmpeg[0-9]*_[0-9.]+-[0-9]+-bookworm_${arch}\.deb" | sort -V | tail -n 1) && \
    if [ -z "$LATEST_FILE" ]; then echo "ERRO: Arquivo não encontrado no repo"; exit 1; fi && \
    echo "Downloading ${LATEST_FILE}..." && \
    wget -q -O /tmp/jellyfin-ffmpeg.deb "${REPO_URL}${LATEST_FILE}" && \
    dpkg -i /tmp/jellyfin-ffmpeg.deb && \
    apt-get install -f -y && \
    rm /tmp/jellyfin-ffmpeg.deb


RUN dpkg --configure -a
RUN apt clean
RUN apt --fix-missing update
RUN apt update -y
RUN apt -f install

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

WORKDIR /home/container
ENV USER=container HOME=/home/container

CMD [ "/bin/bash", "/entrypoint.sh" ]