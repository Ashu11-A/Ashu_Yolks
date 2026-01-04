FROM ghcr.io/xtls/xray-core:latest AS xray-source
FROM alpine:3.20

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apk update
RUN apk add --no-cache \
  bash \
  ca-certificates \
  tzdata 

RUN echo "http://dl-cdn.alpinelinux.org/alpine/v3.20/community" >> /etc/apk/repositories \
  && echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories \
  && apk add --no-cache \
  figlet \
  lolcat

COPY --from=xray-source /usr/bin/xray /usr/local/bin/xray
COPY --from=xray-source /usr/share/xray /usr/local/share/xray
COPY ./entrypoint.sh /entrypoint.sh

USER container
ENV USER=container
ENV HOME=/home/container
WORKDIR /home/container

CMD ["/bin/bash", "/entrypoint.sh"]