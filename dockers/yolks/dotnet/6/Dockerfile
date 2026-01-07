ARG REPO=mcr.microsoft.com/dotnet/aspnet
FROM $REPO:6.0.13-bullseye-slim

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  curl \
  bash \
  git \
  wget \
  libsdl2-dev \
  libc6 \
  libgcc1 \
  libgssapi-krb5-2 \
  libstdc++6 \
  zlib1g \
  iproute2 \
  && rm -rf /var/lib/apt/lists/*

ENV LC_ALL=en_US.UTF-8
ENV LANG=en_US.UTF-8
ENV LANGUAGE=en_US.UTF-8

USER container
ENV USER=container HOME=/home/container
WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh
CMD ["/bin/bash", "/entrypoint.sh"]