FROM alpine:latest

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apk update

RUN apk add --no-cache --virtual=build-dependencies --upgrade \
    file \
    git \
    wget \
    jq \
    tar \
    unzip \
    curl

RUN mkdir /var/log/pterodactyl && \
    mkdir /var/log/pterodactyl/install && \
    echo " " > /var/log/pterodactyl/wings.log && \
    chmod 775 /var/log/pterodactyl/wings.log

# Remove o link simbólico para o shell padrão e cria um novo link simbólico para o bash
RUN apk add --no-cache bash fakeroot
RUN rm /bin/sh && ln -s /bin/bash /bin/sh


RUN echo "UTC" > /etc/timezone

USER container
ENV  USER container
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD [ "bash", "/entrypoint.sh" ]