FROM ghcr.io/pterodactyl/wings:latest

ENV TZ="UTC" \
    WINGS_UID="988" \
    WINGS_GID="988" \
    WINGS_USERNAME="pterodactyl"

RUN apk --no-cache add curl

# Set up networking
RUN mkdir -p /var/lib/docker/containers && \
    mkdir -p /etc/pterodactyl && \
    mkdir -p /var/lib/pterodactyl && \
    mkdir -p /var/log/pterodactyl && \
    mkdir -p /tmp/pterodactyl && \
    chown -R pterodactyl:pterodactyl /etc/pterodactyl /var/lib/pterodactyl /var/log/pterodactyl /tmp/pterodactyl && \
    chmod -R 755 /etc/pterodactyl /var/lib/pterodactyl /var/log/pterodactyl /tmp/pterodactyl

VOLUME [ "/var/run/docker.sock", "/var/lib/docker/containers/", "/etc/pterodactyl/", "/var/lib/pterodactyl/", "/var/log/pterodactyl/", "/tmp/pterodactyl/" ]

EXPOSE 8080 2022

CMD ["/usr/bin/php", "/usr/local/bin/wings", "--config", "/etc/pterodactyl/config.yml"]