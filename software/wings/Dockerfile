FROM debian:latest

# Define o usuário não-raiz que irá executar o daemon do Docker
ARG USER_NAME=dockeruser
ARG USER_ID=1000
ARG GROUP_NAME=dockergroup
ARG GROUP_ID=1000

# Instalação de dependências necessárias para o Docker
RUN apt-get update && apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg2 \
    software-properties-common \
    tzdata \
    iproute2 \
    dbus-user-session \
    fuse-overlayfs \
    slirp4netns \
    uidmap

# Cria o usuário não-raiz e adiciona-o ao grupo do Docker
RUN groupadd -g $GROUP_ID $GROUP_NAME
RUN useradd -m -u $USER_ID -g $GROUP_NAME $USER_NAME

# Define o usuário padrão para o Docker
USER $USER_NAME

RUN curl -sSL https://get.docker.com/rootless | sh

ENV PATH=/home/$user/bin:$PATH
ENV DOCKER_HOST=unix:///home/container/docker.sock

RUN docker context use rootless

# Inicializa o daemon do Docker
COPY        ./entrypoint.sh /entrypoint.sh
CMD         [ "/bin/bash", "/entrypoint.sh" ]