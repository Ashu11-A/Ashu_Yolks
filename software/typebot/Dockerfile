FROM node:18-bullseye-slim
RUN apt-get -qy update \
    && apt-get -qy --no-install-recommends install \
    openssl git \
    && apt-get autoremove -yq \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
RUN npm --global install pnpm
RUN npm --global install turbo

USER        container
ENV         USER=container HOME=/home/container
WORKDIR     /home/container

COPY        ./entrypoint.sh /entrypoint.sh
CMD         [ "/bin/bash", "/entrypoint.sh" ]
