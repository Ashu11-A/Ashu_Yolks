FROM debian:latest

RUN apt update && apt install -y \
    curl \
    grep \
    tar \
    python3 \
    wget \
    iproute2 \
    dbus-bin \
    python3-pip \
    python3-setuptools \
    python3-venv \
    pipx

# Download Proton GE
RUN curl -sLOJ "$(curl -s https://api.github.com/repos/GloriousEggroll/proton-ge-custom/releases/latest | grep browser_download_url | cut -d\" -f4 | egrep .tar.gz)"
RUN tar -xzf GE-Proton*.tar.gz -C /usr/local/bin/ --strip-components=1
RUN rm GE-Proton*.*

# Proton Fix machine-id
RUN rm -f /etc/machine-id
RUN dbus-uuidgen --ensure=/etc/machine-id
RUN rm /var/lib/dbus/machine-id
RUN dbus-uuidgen --ensure

#Setup Protontricks.
RUN pipx install protontricks

# Set up Winetricks
RUN	wget -q -O /usr/sbin/winetricks https://raw.githubusercontent.com/Winetricks/winetricks/master/src/winetricks \
    && chmod +x /usr/sbin/winetricks

RUN curl -sLOJ "$(curl -s https://api.github.com/repos/gorcon/rcon-cli/releases/latest | grep browser_download_url | cut -d\" -f4 | egrep amd64_linux.tar.gz)"
RUN tar -xzf rcon*.tar.gz -C /usr/local/bin/ --strip-components=1
RUN rm rcon*.*

LABEL author="Ashu11-a" maintainer="Matheusn.biolowons@gmail.com"

USER    container
ENV     USER=container HOME=/home/container
WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh
CMD [ "/bin/bash", "/entrypoint.sh" ]