FROM oven/bun:alpine

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apk add --no-cache --upgrade \
  bash \
  ca-certificates \
  chromium \
  curl \
  file \
  freetype \
  git \
  harfbuzz \
  iptables \
  jq \
  nss \
  tar \
  ttf-freefont \
  tzdata \
  unzip \
  wget

ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_SKIP_DOWNLOAD=true \
    USER=container \
    HOME=/home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh
CMD [ "/bin/bash", "/entrypoint.sh" ]
