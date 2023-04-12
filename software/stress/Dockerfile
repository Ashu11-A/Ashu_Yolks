FROM alpine:latest as build

RUN echo "@testing http://nl.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories && \
    apk add --update \
    build-base \
    libaio-dev \
    libattr \
    libbsd-dev \
    libcap-dev \
    libcap-dev \
    libgcrypt-dev \
    jpeg-dev \
    judy-dev@testing \
    keyutils-dev \
    lksctp-tools-dev \
    libatomic \
    zlib-dev \
    kmod-dev \
    xxhash-dev \
    git \
    libmd-dev \
    libseccomp-dev \
    mesa-dev

RUN git clone https://github.com/ColinIanKing/stress-ng

RUN cd stress-ng && mkdir install-root && \
    make && make DESTDIR=install-root/ install

####### actual image ########

FROM alpine:latest

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN echo "@testing http://nl.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories && \
    apk add --update libaio libattr libbsd libcap libcap libgcrypt jpeg judy@testing keyutils lksctp-tools libatomic zlib kmod-dev xxhash-dev && \
    rm -rf /tmp/* /var/tmp/* /var/cache/apk/* /var/cache/distfiles/*

RUN apk add --update curl bash

COPY --from=build stress-ng/install-root/ /

WORKDIR     /home/container

COPY        ./entrypoint.sh /entrypoint.sh
CMD         [ "/bin/ash", "/entrypoint.sh" ]
