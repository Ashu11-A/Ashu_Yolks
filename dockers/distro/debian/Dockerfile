FROM debian:12-slim

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"
ENV DEBIAN_FRONTEND=noninteractive

RUN apt update
RUN apt upgrade -y
RUN apt install -y --no-install-recommends \
  apt-transport-https \
  ca-certificates \
  curl \
  git \
  gnupg \
  iproute2 \
  jq \
  locales \
  net-tools \
  tar \
  tzdata \
  unzip \
  wget \
  zip

RUN apt-get clean \
  && rm -rf /var/lib/apt/lists/*

ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    USER=container \
    HOME=/home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh
CMD ["/bin/bash", "/entrypoint.sh"]