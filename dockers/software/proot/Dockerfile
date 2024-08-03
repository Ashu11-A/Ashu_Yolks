FROM debian:latest

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

ENV DEBIAN_FRONTEND noninteractive

## update base packages
RUN apt update && \
        apt install -y git wget curl tar zip unzip binutils xz-utils locales iproute2

RUN apt install -y qemu-user-static proot

## configure locale
RUN update-locale lang=en_US.UTF-8 && \
        dpkg-reconfigure --frontend noninteractive locales

USER container
ENV USER container
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD [ "bash", "/entrypoint.sh" ]
