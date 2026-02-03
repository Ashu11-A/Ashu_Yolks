FROM alpine:latest AS build

# Adiciona repositório testing e dependências
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
  kmod-dev \
  xxhash-dev \
  libmd-dev \
  libseccomp-dev \
  mpfr-dev

RUN git clone https://github.com/ColinIanKing/stress-ng

# Compila o projeto
RUN cd stress-ng && \
  make clean && \
  make -j$(nproc) && \
  mkdir -p install-root && \
  make DESTDIR=install-root/ install

# --- Imagem Final ---
FROM alpine:latest

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

# Instalação das dependências de Runtime
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
  xxhash-libs \
  xz-libs \
  kmod

# Copia os binários compilados
COPY --from=build /stress-ng/install-root/ /

ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

USER container
ENV USER=container HOME=/home/container
WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh
CMD ["/bin/bash", "/entrypoint.sh"]
