ARG REPO=mcr.microsoft.com/dotnet/aspnet
FROM $REPO:8.0.3-bookworm-slim

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y --no-install-recommends \
  apt-transport-https \
  binutils \
  ca-certificates \
  cabextract \
  cec-utils \
  curl \
  ffmpeg \
  git \
  gnupg \
  icu-devtools \
  iproute2 \
  libasound2 \
  libatomic1 \
  libegl1 \
  libfontconfig1 \
  libfreetype6 \
  libgcc-s1 \
  libgssapi-krb5-2 \
  libpulse0 \
  libsdl2-dev \
  libsqlite3-0 \
  libsqlite3-dev \
  libstdc++6 \
  locales \
  net-tools \
  software-properties-common \
  sqlite3 \
  tar \
  telnet \
  tzdata \
  unzip \
  wget \
  xz-utils \
  zip \
  zlib1g

RUN apt-get clean && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ENV LC_ALL=en_US.UTF-8
ENV LANG=en_US.UTF-8
ENV LANGUAGE=en_US.UTF-8

USER container
ENV USER=container HOME=/home/container
WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh
CMD ["/bin/bash", "/entrypoint.sh"]