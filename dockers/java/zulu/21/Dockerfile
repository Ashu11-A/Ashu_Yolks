FROM azul/zulu-openjdk-alpine:21-jre-headless-latest

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apk add --no-cache --update \
    bash \
    ca-certificates \
    curl \
    eudev \
    git \
    numactl \
    openssl \
    tar \
    tzdata \
    wget

ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    USER=container \
    HOME=/home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh
CMD ["/bin/bash", "/entrypoint.sh"]