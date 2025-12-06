FROM alpine:latest AS build

# Adiciona repositório testing para o pacote judy-dev
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
  mesa-dev \
  mpfr-dev

RUN git clone https://github.com/ColinIanKing/stress-ng

# Compila o projeto
# O comando make clean garante que não haja artefatos antigos
RUN cd stress-ng && \
  make clean && \
  make -j$(nproc) && \
  mkdir -p install-root && \
  make DESTDIR=install-root/ install

# --- Imagem Final ---
FROM alpine:latest

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

# Instalação apenas das dependências de Runtime (Execução)
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
  xxhash

# Copia apenas os binários compilados do estágio de build
COPY --from=build /stress-ng/install-root/ /

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

WORKDIR /home/container

RUN adduser -D -h /home/container container
ENV USER=container HOME=/home/container

CMD [ "/bin/bash", "/entrypoint.sh" ]