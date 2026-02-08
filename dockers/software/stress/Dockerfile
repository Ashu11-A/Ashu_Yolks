FROM alpine:latest AS build

# --- Build Stage ---
RUN echo "@testing https://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories && \
  apk add --no-cache \
  build-base \
  git \
  libaio-dev \
  libattr \
  libbsd-dev \
  libcap-dev \
  libgcrypt-dev \
  jpeg-dev \
  judy-dev@testing \
  keyutils-dev \
  lksctp-tools-dev \
  libatomic \
  zlib-dev \
  libmd-dev \
  libseccomp-dev \
  mpfr-dev

RUN git clone https://github.com/ColinIanKing/stress-ng

# Compilação
RUN cd stress-ng && \
  make clean && \
  make -j$(nproc) && \
  mkdir -p install-root && \
  make DESTDIR=install-root/ install

# --- Final Image ---
FROM alpine:latest

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

# --- Runtime Stage ---
RUN echo "@testing https://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories && \
  apk add --no-cache \
  bash \
  curl \
  libaio \
  libattr \
  libbsd \
  libcap \
  libgcrypt \
  jpeg \
  judy@testing \
  keyutils \
  lksctp-tools \
  libatomic \
  zlib \
  libmd \
  libseccomp \
  xz-libs

# Copia os binários
COPY --from=build /stress-ng/install-root/ /

ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    USER=container \
    HOME=/home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh
CMD ["/bin/bash", "/entrypoint.sh"]
