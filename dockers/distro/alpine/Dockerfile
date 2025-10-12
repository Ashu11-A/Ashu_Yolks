FROM alpine:3.20

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apk update && \
  apk install --no-cache \
  ca-certificates \
  curl \
  git \
  tar \
  unzip

RUN apk add --no-cache --upgrade bash
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN echo "http://dl-cdn.alpinelinux.org/alpine/v3.20/community" >> /etc/apk/repositories && \
  echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories && \
  apk update && \
  apk add --no-cache figlet lolcat

USER container
WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh
CMD ["/bin/bash", "/entrypoint.sh"]