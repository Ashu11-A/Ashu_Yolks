# bun-vpn — the Bun runtime (oven/bun:alpine) plus a full per-IP VPN stack, built to run NyaNER's
# multi-IP cluster scraper on a Pterodactyl node. It bundles vopono + OpenVPN + WireGuard so each
# config/vpn/*.{ovpn,conf} gets its own network-namespace exit IP via passwordless vopono sudo for the
# non-root `container` user. No Chromium/Puppeteer: this scraper does not use the browser
# path. See README.md for the host capabilities the node must grant (NET_ADMIN + /dev/net/tun).

# ---- stage 1: build vopono in an isolated Rust toolchain (kept out of the final image) --------------
FROM rust:alpine AS vopono-build
# Pin with --build-arg VOPONO_VERSION=x.y.z for reproducible builds; "latest" tracks crates.io.
ARG VOPONO_VERSION=latest
# build-base/openssl/pkgconf/perl for the C/OpenSSL deps; cmake/go/clang/linux-headers for aws-lc-sys
# (pulled in transitively via rustls) which compiles AWS-LC from source on musl.
RUN apk add --no-cache build-base openssl-dev openssl-libs-static pkgconf perl cmake go clang linux-headers
RUN if [ "$VOPONO_VERSION" = "latest" ]; then \
      cargo install vopono --locked --root /out; \
    else \
      cargo install vopono --version "$VOPONO_VERSION" --locked --root /out; \
    fi

# ---- stage 2: the runtime image --------------------------------------------------------------------
FROM oven/bun:alpine

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com" \
      org.opencontainers.image.description="bun + vopono/OpenVPN/WireGuard runtime for the NyaNER cluster scraper (non-root, Pterodactyl)"

# Base tooling (Pterodactyl install/startup: clone + bun install) + the VPN stack and the tools vopono
# shells out to (ip/iptables/openvpn/wg + capsh/pgrep/resolvconf).
RUN apk add --no-cache --upgrade \
  bash \
  ca-certificates \
  curl \
  file \
  git \
  ip6tables \
  iproute2 \
  iptables \
  jq \
  libcap \
  openresolv \
  openvpn \
  procps \
  shadow \
  sudo \
  tar \
  tzdata \
  unzip \
  wget \
  wireguard-tools

# apk on this base installs packages 0750 root:root — binaries AND their shared libraries — so the
# non-root `container` user can neither execute the tools nor dlopen their libs (e.g. bash can't load
# libreadline). Worse, the base bun entrypoint probes `! [ -x /bin/bash ]`, sees the login shell as
# non-executable for that user, and rewrites our CMD into `bun /bin/bash …` (-> "EACCES reading
# /bin/bash", the container never starts). Re-assert world read+exec across the system dirs (and the
# public TLS certs) so a non-root run works. `a+rX` only adds exec to files that already have an exec
# bit (never data files), and /etc is left alone apart from /etc/ssl so /etc/shadow keeps its mode.
RUN chmod -R a+rX /usr /lib /bin /sbin /etc/ssl

# vopono (built above) lives outside /home/container because the Pterodactyl volume is mounted over
# that path at runtime, which would hide anything installed there.
COPY --from=vopono-build /out/bin/vopono /usr/local/bin/vopono

# The Pterodactyl runtime user, created with the default wings uid/gid (988); override at build time if
# your node uses a different uid. vopono needs root for network namespace setup, so grant only vopono
# passwordless sudo instead of full root shell access to the container user.
ARG CONTAINER_UID=988
ARG CONTAINER_GID=988
RUN groupadd -g "${CONTAINER_GID}" container 2>/dev/null || true \
  && useradd -u "${CONTAINER_UID}" -g "${CONTAINER_GID}" -d /home/container -s /bin/bash -M container 2>/dev/null || true \
  && mkdir -p /home/container \
  && chown "${CONTAINER_UID}:${CONTAINER_GID}" /home/container \
  && printf 'container ALL=(root) NOPASSWD: /usr/local/bin/vopono *\n' > /etc/sudoers.d/container-vopono \
  && chmod 0440 /etc/sudoers.d/container-vopono

ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    USER=container \
    HOME=/home/container \
    VOPONO_BIN=/usr/local/bin/vopono \
    NYANER_PROGRESS=1

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh
CMD [ "/bin/bash", "/entrypoint.sh" ]
