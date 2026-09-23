FROM ubuntu:26.04

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"
ENV DEBIAN_FRONTEND=noninteractive

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN apt-get update && apt-get install -y --no-install-recommends \
  ca-certificates \
  curl \
  gnupg \
  && install -m 0755 -d /etc/apt/keyrings \
  && curl -fsSL https://repo.jellyfin.org/jellyfin_team.gpg.key | gpg --dearmor -o /etc/apt/keyrings/jellyfin.gpg \
  && export VERSION_OS="$(awk -F'=' '/^ID=/{ print $NF }' /etc/os-release)" \
  && export VERSION_CODENAME="$(awk -F'=' '/^VERSION_CODENAME=/{ print $NF }' /etc/os-release)" \
  && export DPKG_ARCHITECTURE="$(dpkg --print-architecture)" \
  && cat <<EOF > /etc/apt/sources.list.d/jellyfin.sources
Types: deb
URIs: https://repo.jellyfin.org/${VERSION_OS}
Suites: ${VERSION_CODENAME}
Components: main
Architectures: ${DPKG_ARCHITECTURE}
Signed-By: /etc/apt/keyrings/jellyfin.gpg
EOF

ADD https://repo.jellyfin.org/ubuntu/dists/resolute/InRelease /tmp/jellyfin-InRelease

RUN apt-get update && apt-get install -y --no-install-recommends \
  bash \
  curl \
  git \
  locales \
  iproute2 \
  ca-certificates \
  xz-utils \
  tar \
  ocl-icd-libopencl1 \
  jellyfin \
  && rm -rf /var/lib/apt/lists/*

ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    USER=container \
    HOME=/home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh
CMD ["/bin/bash", "/entrypoint.sh"]
