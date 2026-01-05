FROM ghcr.io/xtls/xray-core:latest AS xray-source
FROM alpine:3.20

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apk update
RUN apk add --no-cache \
  bash \
  ca-certificates \
  tzdata \
  curl

RUN echo "http://dl-cdn.alpinelinux.org/alpine/v3.20/community" >> /etc/apk/repositories \
  && echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories \
  && apk add --no-cache \
  figlet \
  lolcat

# Binário Executável.
COPY --from=xray-source /usr/local/bin/xray /usr/local/bin/xray
# Arquivos de Recursos (GeoIP / GeoSite)
COPY --from=xray-source /usr/local/share/xray /usr/local/share/xray
# Arquivos de Configuração Padrão (00_log.json, 01_api.json, etc.)
COPY --from=xray-source /usr/local/etc/xray /usr/local/etc/xray
COPY ./entrypoint.sh /entrypoint.sh

USER container
ENV USER=container
ENV HOME=/home/container
WORKDIR /home/container

CMD ["/bin/bash", "/entrypoint.sh"]