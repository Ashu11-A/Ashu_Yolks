FROM alpine:3.14.1


# System settings. User normally shouldn't change these parameters
ENV APP_NAME Dockovpn
ENV APP_INSTALL_PATH /home/container/${APP_NAME}
ENV APP_PERSIST_DIR /home/container/${APP_NAME}_data

# Configuration settings with default values
ENV NET_ADAPTER eth0
ENV HOST_ADDR localhost
ENV HOST_TUN_PORT 1194
ENV HOST_CONF_PORT 80

WORKDIR ${APP_INSTALL_PATH}

COPY scripts .
COPY config ./config
COPY VERSION ./config

RUN apk add --no-cache openvpn easy-rsa bash netcat-openbsd zip dumb-init && \
    ln -s /usr/share/easy-rsa/easyrsa /usr/bin/easyrsa && \
    mkdir -p ${APP_PERSIST_DIR} && \
    cd ${APP_PERSIST_DIR} && \
    easyrsa init-pki && \
    easyrsa gen-dh && \
    # DH parameters of size 2048 created at /usr/share/easy-rsa/pki/dh.pem
    # Copy DH file
    cp pki/dh.pem /etc/openvpn && \
    # Copy FROM ./scripts/server/conf TO /etc/openvpn/server.conf in DockerFile
    cd ${APP_INSTALL_PATH} && \
    cp config/server.conf /etc/openvpn/server.conf


VOLUME [ "/home/container/Dockovpn_data" ]

COPY  ./entrypoint.sh /entrypoint.sh
CMD   [ "/bin/bash", "/entrypoint.sh" ]
