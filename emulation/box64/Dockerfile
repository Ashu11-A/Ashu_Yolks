#arm64v8
FROM debian:bullseye-slim as build

RUN dpkg --add-architecture armhf && \
    apt-get update && \
    apt-get install --yes --no-install-recommends git  python3 build-essential cmake ca-certificates && \
    apt-get install --yes --no-install-recommends gcc-arm-linux-gnueabihf libc6-dev-armhf-cross libc6:armhf libstdc++6:armhf && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/{apt,dpkg,cache,log} /tmp/* /var/tmp/*

RUN git clone https://github.com/ptitSeb/box64.git; mkdir /box64/build

WORKDIR /box64/build
RUN cmake .. -DRPI4ARM64=1 -DARM_DYNAREC=ON -DCMAKE_BUILD_TYPE=RelWithDebInfo && \
    make -j$(nproc) && \
    make install DESTDIR=/tmp/install

FROM debian:bullseye-slim
LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"
LABEL "org.opencontainers.image.source"="https://github.com/weilbyte/box"

COPY --from=build /tmp/install /

RUN dpkg --add-architecture armhf && \
    apt-get update && \
    apt-get install --yes --no-install-recommends libc6:armhf libstdc++6:armhf && \
    apt-get -y autoremove && \
    apt-get clean autoclean && \
    rm -rf /tmp/* /var/tmp/* /var/lib/apt/lists

RUN apt-get update && apt-get install -y apt-transport-https
RUN          apt install -y libc++-dev libc6 git wget curl tar zip unzip binutils xz-utils liblzo2-2 cabextract iproute2 net-tools libatomic1 libsdl1.2debian libsdl2-2.0-0 \
             libfontconfig libicu67 icu-devtools libunwind8 libssl-dev sqlite3 libsqlite3-dev libmariadbclient-dev-compat libduktape205 locales ffmpeg gnupg2 apt-transport-https software-properties-common ca-certificates \
             libz-dev rapidjson-dev tzdata libevent-dev libzip4 libsdl2-mixer-2.0-0 libsdl2-image-2.0-0 build-essential cmake libgdiplus libc-bin

RUN     update-locale lang=en_US.UTF-8 \
        && dpkg-reconfigure --frontend noninteractive locales



RUN		useradd -d /home/container -m container
USER    container
ENV     USER=container HOME=/home/container
WORKDIR /home/container

COPY    ./entrypoint.sh /entrypoint.sh
CMD     ["/bin/bash", "/entrypoint.sh"]
