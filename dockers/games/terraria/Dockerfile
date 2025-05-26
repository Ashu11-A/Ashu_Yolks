FROM alpine:latest

# Adiciona os repositórios edge/main e edge/community
RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories

# Atualiza índices
RUN apk update

# Instala utilitários básicos
RUN apk add --no-cache --upgrade \
    curl coreutils

# Instala pacotes específicos de edge/testing
RUN apk add --no-cache libfaketime --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing
RUN apk add --no-cache mono

# Configura locale
RUN echo "America/Sao_Paulo" > /etc/timezone
ENV LANG pt_BR.UTF-8
ENV LANGUAGE pt_BR.UTF-8
ENV LC_ALL pt_BR.UTF-8

# Instala e define bash como shell padrão
RUN apk add --no-cache --upgrade bash \
    && rm /bin/sh \
    && ln -s /bin/bash /bin/sh

# Usuário não-root
USER container
ENV USER container
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh
CMD ["/bin/bash", "/entrypoint.sh"]
