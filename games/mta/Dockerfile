FROM        ubuntu:latest

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN         apt update \
            && apt -y upgrade
RUN         dpkg --configure -a \
            && apt-get install -f

RUN         DEBIAN_FRONTEND=noninteractive TZ=Etc/UTC apt-get -y install tzdata

RUN         apt update \
            && apt upgrade -y \
            && apt install -y \
            tar \
            curl \
            unzip \
            iproute2 \
            openssl \
            ca-certificates \
            dnsutils \
            zip \
            gdb \
            libncursesw5-dev \
            libncursesw5 \
            libreadline-dev \
            libmysqlclient-dev \
            default-libmysqlclient-dev \
	        libncurses5-dev \
	        libncurses5 \
            git \
            mysql-client \
            && useradd -d /home/container -m container

RUN         mkdir -p /run/systemd && echo 'docker' > /run/systemd/container
RUN         rm -rf /var/lib/apt/lists/*

COPY        ./libmysqlclient.so.16 /usr/lib

USER        container
ENV         USER=container HOME=/home/container
WORKDIR     /home/container

COPY        ./entrypoint.sh /entrypoint.sh
CMD         [ "/bin/bash", "/entrypoint.sh" ]
