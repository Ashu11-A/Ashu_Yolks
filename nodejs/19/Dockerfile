FROM        node:19-bullseye-slim

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN         apt update

RUN         apt upgrade -y

RUN         dpkg --configure -a

RUN         apt-get install --fix-broken

RUN         apt-get update && apt-get install -y --no-install-recommends ffmpeg iproute2 git sqlite3 libsqlite3-dev python3 python3-dev ca-certificates dnsutils tzdata zip tar curl build-essential libtool \
            && npm -g install npm@latest \
            && useradd -m -d /home/container container

USER        container
ENV         USER=container HOME=/home/container
WORKDIR     /home/container

COPY        ./entrypoint.sh /entrypoint.sh
CMD         [ "/bin/bash", "/entrypoint.sh" ]