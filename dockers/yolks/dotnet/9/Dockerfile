ARG REPO=mcr.microsoft.com/dotnet/aspnet
FROM $REPO:9.0.11-alpine3.23

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apk add --no-cache \
  ca-certificates \
  curl \
  bash \
  git \
  wget \
  jq \
  unzip \
  icu-libs

ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false
ENV LANG=en_US.UTF-8
ENV LC_ALL=en_US.UTF-8

USER container
ENV USER=container HOME=/home/container
WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh
CMD ["/bin/bash", "/entrypoint.sh"]