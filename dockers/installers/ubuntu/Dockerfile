FROM ubuntu:focal
LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

ENV         DEBIAN_FRONTEND=noninteractive

RUN         apt update \
  && apt upgrade -y \
  && apt -y --no-install-recommends install ca-certificates curl git unzip zip tar jq
