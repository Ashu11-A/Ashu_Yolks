ARG REPO=mcr.microsoft.com/dotnet/aspnet
FROM $REPO:10.0.1-alpine3.23

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apk add --no-cache \
  bash \
  curl \
  wget \
  jq \
  git \
  unzip \
  ca-certificates \
  icu-libs \
  gcompat \
  libstdc++ \
  zlib \
  sdl2

ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false
ENV LANG=en_US.UTF-8
ENV LC_ALL=en_US.UTF-8

USER container
ENV USER=container HOME=/home/container
WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh
CMD ["/bin/bash", "/entrypoint.sh"]