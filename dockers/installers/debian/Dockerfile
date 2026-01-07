FROM debian:stable-slim

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"
ENV DEBIAN_FRONTEND=noninteractive

RUN apt update
RUN apt upgrade -y
RUN apt -y --no-install-recommends install \
  ca-certificates \
  curl \
  wget \
  git \
  unzip \
  zip \
  tar \
  jq 
