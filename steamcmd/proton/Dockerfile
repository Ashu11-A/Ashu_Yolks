# ---------------------------------------------
# Steam Proton image
# ---------------------------------------------
FROM        debian:bullseye-slim

LABEL       author="Torsten Widmann" maintainer="info@goover.de"

# Config
RUN         apt update \
            && apt -y upgrade
RUN         dpkg --configure -a \
            && apt-get install -f

# Style
RUN         apt install -y lolcat figlet

## install required packages
RUN         
RUN         apt install -y --no-install-recommends wget iproute2 gnupg2 software-properties-common libntlm0 winbind xvfb xauth libncurses5-dev libncurses6 dbus libgdiplus
RUN         apt install -y alsa-tools libpulse0 pulseaudio libpulse-dev libasound2 libao-common gnutls-bin gnupg locales numactl cabextract curl python3 python3-pip python3-setuptools
RUN         useradd -d /home/container -m container

# Download Proton GE
RUN         curl -sLOJ "$(curl -s https://api.github.com/repos/GloriousEggroll/proton-ge-custom/releases/latest | grep browser_download_url | cut -d\" -f4 | egrep .tar.gz)"
RUN         tar -xzf GE-Proton*.tar.gz -C /usr/local/bin/ --strip-components=1
RUN         rm GE-Proton*.*

# Proton Fix machine-id
RUN         rm -f /etc/machine-id
RUN         dbus-uuidgen --ensure=/etc/machine-id
RUN         rm /var/lib/dbus/machine-id
RUN         dbus-uuidgen --ensure

#Setup Protontricks.
RUN         python3 -m pip install protontricks

# Set up Winetricks
RUN	        wget -q -O /usr/sbin/winetricks https://raw.githubusercontent.com/Winetricks/winetricks/master/src/winetricks \
            && chmod +x /usr/sbin/winetricks

## install rcon
RUN         cd /tmp/ \
            && curl -LOJ "$(curl https://api.github.com/repos/gorcon/rcon-cli/releases/latest | grep browser_download_url | grep $(dpkg --print-architecture) | grep $([ "$(dpkg --print-architecture)" == "amd64" ] && echo "linux" || echo "darwin" ) | cut -d\" -f4 | egrep .tar.gz)"
RUN         cd /tmp/ \
            tar -xvf rcon-*.tar.gz -C /usr/local/bin/

RUN         $([ "$(dpkg --print-architecture)" == "arm64" ] && echo "apt install -y cmake clang-6.0 bison flex xz-utils libfuse-dev libudev-dev pkg-config \
            libc6-dev-i386 libcap2-bin git git-lfs libglu1-mesa-dev libcairo2-dev \
            libgl1-mesa-dev libtiff5-dev libfreetype6-dev libxml2-dev libegl1-mesa-dev libfontconfig1-dev \
            libbsd-dev libxrandr-dev libxcursor-dev libgif-dev libpulse-dev libavformat-dev libavcodec-dev \
            libswresample-dev libdbus-1-dev libxkbfile-dev libssl-dev llvm-dev" || echo "apt install -y lib32gcc-s1" )

            
USER        container
ENV         USER=container HOME=/home/container
WORKDIR     /home/container

COPY        ./../entrypoint.sh /entrypoint.sh
CMD         [ "/bin/bash", "/entrypoint.sh" ]