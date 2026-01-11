ARG REPO=mcr.microsoft.com/dotnet/aspnet
FROM $REPO:6.0.36-alpine3.20

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apk add --no-cache \
  ca-certificates \
  curl \
  bash \
  git \
  wget \
  jq \
  unzip

ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

USER container
ENV USER=container HOME=/home/container
WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh
CMD ["/bin/bash", "/entrypoint.sh"]