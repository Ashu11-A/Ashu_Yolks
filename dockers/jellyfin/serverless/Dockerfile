FROM alpine:latest

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"
ENV DOCKER_PLATFORMS=linux/amd64,linux/armhf,linux/arm64

# Configurações de Globalização (Recomendado manter para suporte a caracteres/culturas) 
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false \
  LC_ALL=en_US.UTF-8 \
  LANG=en_US.UTF-8

RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
  && apk update \
  && apk add --no-cache \
  bash \
  curl \
  icu-libs \
  tzdata \
  jellyfin-web

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

WORKDIR /home/container

RUN adduser -D -h /home/container container
ENV USER=container HOME=/home/container

CMD [ "/bin/bash", "/entrypoint.sh" ]