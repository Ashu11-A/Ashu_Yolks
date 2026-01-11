FROM alpine:latest

RUN apk update
RUN apk add --no-cache --upgrade \
  curl \
  coreutils \
  bash \
  mono

RUN apk add --no-cache libfaketime --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing

ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

USER container
ENV USER=container HOME=/home/container
WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh
CMD ["/bin/bash", "/entrypoint.sh"]