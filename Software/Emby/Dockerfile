ARG REPO=mcr.microsoft.com/dotnet/aspnet
FROM $REPO:6.0.9-jammy

ENV \
    # Unset ASPNETCORE_URLS from aspnet base image
    ASPNETCORE_URLS= \
    # Do not generate certificate
    DOTNET_GENERATE_ASPNET_CERTIFICATE=false \
    # Do not show first run text
    DOTNET_NOLOGO=true \
    # SDK version
    DOTNET_SDK_VERSION=6.0.401 \
    # Enable correct mode for dotnet watch (only mode supported in a container)
    DOTNET_USE_POLLING_FILE_WATCHER=true \
    # Skip extraction of XML docs - generally not useful within an image/container - helps performance
    NUGET_XMLDOC_MODE=skip \
    # PowerShell telemetry for docker image usage
    POWERSHELL_DISTRIBUTION_CHANNEL=PSDocker-DotnetSDK-Ubuntu-22.04

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        curl \
        git \
        wget \
        libsdl2-dev \
        libc6 \
        libgcc1 \
        libgssapi-krb5-2 \
        libstdc++6 \
        zlib1g \
        iproute2 \
        gnupg \
        gnupg2 \
    && rm -rf /var/lib/apt/lists/*

RUN if [[ $(uname -m) == 'x86_64' ]]; then \
    curl -fSL --output dotnet.tar.gz https://dotnetcli.azureedge.net/dotnet/Sdk/$DOTNET_SDK_VERSION/dotnet-sdk-$DOTNET_SDK_VERSION-linux-x64.tar.gz \
        ; else \
        curl -fSL --output dotnet.tar.gz https://dotnetcli.azureedge.net/dotnet/Sdk/$DOTNET_SDK_VERSION/dotnet-sdk-$DOTNET_SDK_VERSION-linux-arm64.tar.gz \
        ; fi \
    && mkdir -p /usr/share/dotnet \
    && tar -oxzf dotnet.tar.gz -C /usr/share/dotnet ./packs ./sdk ./sdk-manifests ./templates ./LICENSE.txt ./ThirdPartyNotices.txt \
    && rm dotnet.tar.gz \
    # Trigger first run experience by running arbitrary cmd
    && dotnet help

RUN ARCH=$([ "$(uname -m)" == "x86_64" ] && echo "x64" || echo "arm64") && \
    powershell_version=7.2.6 \
    && curl -fSL --output PowerShell.Linux.$ARCH.$powershell_version.nupkg https://pwshtool.blob.core.windows.net/tool/$powershell_version/PowerShell.Linux.$ARCH.$powershell_version.nupkg \
    && powershell_sha512='1ba4406e51f428e34c89c7e669ac942f64a11de056b25a04054e4955833bae862ea5f5c1993183c081f1e80a2cdc0d6a48e282a01a0c9dbe47dba97b64d7e919' \
    && echo "$powershell_sha512  PowerShell.Linux.$ARCH.$powershell_version.nupkg" | sha512sum -c - \
    && mkdir -p /usr/share/powershell \
    && dotnet tool install --add-source / --tool-path /usr/share/powershell --version $powershell_version PowerShell.Linux.$ARCH \
    && dotnet nuget locals all --clear \
    && rm PowerShell.Linux.$ARCH.$powershell_version.nupkg \
    && ln -s /usr/share/powershell/pwsh /usr/bin/pwsh \
    && chmod 755 /usr/share/powershell/pwsh \
    # To reduce image size, remove the copy nupkg that nuget keeps.
    && find /usr/share/powershell -print | grep -i '.*[.]nupkg$' | xargs rm


ENV          DEBIAN_FRONTEND noninteractive

RUN          useradd -m -d /home/container -s /bin/bash container

RUN          ln -s /home/container/ /nonexistent

ENV          USER=container HOME=/home/container

## Update base packages
RUN          apt update \
             && apt upgrade -y

RUN if [[ $(uname -m) == 'arm64' ]]; then \
  echo "**** add emby deps *****" && \
  curl -s https://keyserver.ubuntu.com/pks/lookup?op=get\&search=0x6587ffd6536b8826e88a62547876ae518cbcf2f2 | apt-key add - && \
  echo "deb http://ppa.launchpad.net/ubuntu-raspi2/ppa-nightly/ubuntu focal main">> /etc/apt/sources.list.d/raspbins.list && \
  apt-get update && \
  apt-get install -y --no-install-recommends \
    libomxil-bellagio0 \
    libomxil-bellagio-bin \
    libraspberrypi0 \
       ; fi

## Install dependencies
RUN apt update && apt install -y build-essential wget && \
    wget https://www.sqlite.org/2022/sqlite-autoconf-3390400.tar.gz && \
    mkdir SQLite && cd SQLite && \
    tar xvfz ../sqlite-autoconf-3390400.tar.gz && rm ../sqlite-autoconf-3390400.tar.gz && cd sqlite-autoconf-3390400 && \
    ./configure && \
    make && \
    make install && \
    rm -rf ../sqlite-autoconf-3390400 && \
    sqlite3 --version &&  \
    apt autoremove -y build-essential && \
    apt remove -y build-essential

RUN          apt update && apt upgrade -y && \
             apt install -y --no-install-recommends wget tar  \
             sqlite3 locales ffmpeg netcat \
             tzdata libsqlite3-0 libfontconfig1 libfreetype6 libsqlite3-dev

RUN      dpkg --configure -a && \
         apt clean && \
         apt --fix-missing update && \
         apt -f install && \
         apt upgrade -y


## Configure locale
RUN          update-locale lang=en_US.UTF-8 \
             && dpkg-reconfigure --frontend noninteractive locales


WORKDIR     /home/container

COPY        ./entrypoint.sh /entrypoint.sh
CMD         [ "/bin/bash", "/entrypoint.sh" ]