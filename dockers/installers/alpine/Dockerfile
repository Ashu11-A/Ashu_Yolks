FROM alpine:latest

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apk add --update --no-cache \
  ca-certificates \
  curl \
  unzip \
  tar \
  git \
  jq \
  wget \
  file

RUN apk add --no-cache --upgrade bash
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
