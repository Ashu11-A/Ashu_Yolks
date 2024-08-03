FROM debian:latest AS build

RUN dpkg --add-architecture armhf && \
    apt-get update && \
    apt-get install -y \
        libc6:armhf \
        gcc-arm-linux-gnueabihf \
        git \
        build-essential \
        cmake \
        python3

WORKDIR /build

RUN git clone https://github.com/ptitSeb/box86 . 
RUN mkdir build && cd build && \
    cmake .. -DRPI4ARM64=1 -DCMAKE_BUILD_TYPE=RelWithDebInfo && \
    make -j$(nproc) && \
    make install DESTDIR=/tmp/install

FROM debian:latest 

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN dpkg --add-architecture armhf && \
    apt-get update && \
    apt-get install --yes --no-install-recommends libc6:armhf libstdc++6:armhf && \
    apt-get -y autoremove && \
    apt-get clean autoclean && \
    rm -rf /tmp/* /var/tmp/* /var/lib/apt/lists

RUN apt update && \
    apt -y upgrade

RUN dpkg --configure -a && \
    apt-get install -f

RUN dpkg --add-architecture i386 && \
    # sed 's/^deb http/deb [arch=armhf] http/' -i '/etc/apt/sources.list' && \
    apt update && \
    apt upgrade -y && \
    apt install -y \
        libstdc++6 \
        lib32stdc++6-amd64-cross \
        lib32stdc++6-mips64-cross \
        tar \
        curl \
        iproute2 \
        openssl \
        fontconfig \
        dirmngr \
        ca-certificates \
        dnsutils \
        tzdata \
        zip
        # libtbb2:i386 \
        # libtbb-dev:i386 \
        # libicu-dev:i386

RUN mkdir -p /run/systemd && echo 'docker' >/run/systemd/container
RUN rm -rf /var/lib/apt/lists/*

COPY --from=build /tmp/install /
USER container
ENV USER=container HOME=/home/container
WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh
CMD ["/bin/bash", "/entrypoint.sh"]
