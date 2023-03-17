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
    software-properties-common

# Adiciona a chave GPG oficial do Docker e adiciona o repositório
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -
RUN add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"

# Instalação do Docker a
RUN apt-get update && apt-get install -y docker

# Cria o usuário não-raiz e adiciona-o ao grupo do Docker
RUN groupadd -g $GROUP_ID $GROUP_NAME
RUN useradd -m -u $USER_ID -g $GROUP_NAME $USER_NAME

# Define o usuário padrão para o Docker
USER $USER_NAME

# Inicializa o daemon do Docker
CMD ["dockerd"]