ARG REPO=mcr.microsoft.com/dotnet/aspnet
FROM $REPO:8.0.22-bookworm-slim

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN apt-get install -y --no-install-recommends \
  ca-certificates \
  curl \
  bash \
  git \
  wget

RUN rm -rf /var/lib/apt/lists/*

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone \
    && ln -s /proc/self/fd /dev/fd 

ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

USER container
ENV USER=container HOME=/home/container
WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh
CMD ["/bin/bash", "/entrypoint.sh"]