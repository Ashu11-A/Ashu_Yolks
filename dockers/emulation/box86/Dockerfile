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

RUN apt update && apt install -y iproute2

COPY --from=build /tmp/install /

USER    container
ENV     USER=container HOME=/home/container
WORKDIR /home/container

COPY    ./entrypoint.sh /entrypoint.sh
CMD     ["/bin/bash", "/entrypoint.sh"]
