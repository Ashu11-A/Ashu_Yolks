FROM debian:latest AS build

RUN apt update && apt install -y \
    git \
    build-essential \
    cmake \
    python3

WORKDIR /box64

RUN git clone https://github.com/ptitSeb/box64 .
RUN mkdir build && cd build && \
    cmake .. -DARM_DYNAREC=ON -DCMAKE_BUILD_TYPE=RelWithDebInfo && \
    make -j$(nproc) && \
    make install

FROM debian:latest

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apt update && apt install -y iproute2

COPY --from=build /box64/build/box64 /bin/box64
COPY --from=build /box64/build/system/box64.conf /etc/binfmt.d/box64.conf
COPY --from=build /box64/x64lib /usr/lib/x86_64-linux-gnu
COPY --from=build /box64/system/box64.box64rc /etc/box64.box64rc

USER    container
ENV     USER=container HOME=/home/container
WORKDIR /home/container

COPY    ./entrypoint.sh /entrypoint.sh
CMD     ["/bin/bash", "/entrypoint.sh"]
