FROM alpine:latest

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"
ENV DEBIAN_FRONTEND=noninteractive

RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
  && apk update \
  && apk add --no-cache \
  bash \
  curl \
  icu-libs \
  tzdata \
  git \
  nginx \
  jellyfin \
  jellyfin-web \
  jellyfin-ffmpeg

ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

USER container
ENV USER=container HOME=/home/container
WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh
CMD ["/bin/bash", "/entrypoint.sh"]