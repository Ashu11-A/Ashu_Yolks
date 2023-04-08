FROM node:16.16.0-alpine AS node
FROM alpine:latest

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apk update

RUN apk add --no-cache --upgrade \
    file \
    git \
    wget \
    jq \
    tar \
    unzip \
    curl \
    ca-certificates \
    ffmpeg \
    go
RUN apk add --update \
  openssl \
  pcre \
  lame \
  libogg \
  libass \
  libvpx \
  libvorbis \
  libwebp \
  libtheora \
  opus \
  rtmpdump \
  x264-dev \
  x265-dev

# Esse codigo o Drylian me passou
# Instala o bash a
RUN apk add --no-cache bash fakeroot

# Remove o link simbólico para o shell padrão e cria um novo link simbólico para o bash
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

COPY --from=node /usr/lib /usr/lib
COPY --from=node /usr/local/share /usr/local/share
COPY --from=node /usr/local/lib /usr/local/lib
COPY --from=node /usr/local/include /usr/local/include
COPY --from=node /usr/local/bin /usr/local/bin

RUN npm -g install npm@latest \
    && go install github.com/alfg/ffmpegd@latest

RUN echo "UTC" > /etc/timezone

USER container
ENV  USER container
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD [ "bash", "/entrypoint.sh" ]