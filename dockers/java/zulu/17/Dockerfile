FROM azul/zulu-openjdk-alpine:17-jre-headless-latest

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apk add --no-cache --update \
    curl \
    wget \
    bash \
    ca-certificates \
    git \
    openssl \
    tar \
    tzdata

# Configuração de variáveis de ambiente para Locale 
ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    USER=container \
    HOME=/home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh
CMD ["/bin/bash", "/entrypoint.sh"]