FROM ubuntu:22.04

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

ARG POSTGRES_VERSION=15

RUN apt-get update && apt-get upgrade -y

RUN DEBIAN_FRONTEND=noninteractive TZ=Etc/UTC apt-get -y install tzdata
RUN echo "UTC" > /etc/timezone

RUN apt-get install -y curl ca-certificates zip unzip git \
sqlite3 git lolcat figlet \
lsb-release apt-transport-https \
software-properties-common gnupg2 cron socat

RUN echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | tee /etc/apt/sources.list.d/sury-php.list \
    && curl -fsSL  https://packages.sury.org/php/apt.gpg| gpg --dearmor -o /etc/apt/trusted.gpg.d/sury-keyring.gpg \
    && apt-get update && apt-get upgrade -y

RUN curl -o nodejssetup.sh https://deb.nodesource.com/setup_19.x
RUN chmod a+x nodejssetup.sh
RUN ./nodejssetup.sh

RUN apt-get install -y nodejs gcc g++ make
RUN apt-get install -y build-essential nginx-full php8.1-fpm php8.1 sqlite3 php8.1-sqlite3 \
                       php8.1-curl php8.1-cli php8.1-lz4 php8.1-pgsql \
                       php8.1-mcrypt php8.1-mysql php8.1-xdebug php8.1-zip \
                       php8.1-common php8.1-readline php8.1-bcmath php8.1-common php8.1-xml

RUN curl -sS https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor | tee /usr/share/keyrings/pgdg.gpg >/dev/null \
    && echo "deb [signed-by=/usr/share/keyrings/pgdg.gpg] http://apt.postgresql.org/pub/repos/apt jammy-pgdg main" > /etc/apt/sources.list.d/pgdg.list \
    && apt-get update \
    && apt-get install -y postgresql-client-$POSTGRES_VERSION postgresql-$POSTGRES_VERSION \
    && apt-get -y autoremove \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

USER        container
ENV         USER=container HOME=/home/container
WORKDIR     /home/container

COPY        ./entrypoint.sh /entrypoint.sh
CMD         [ "/bin/bash", "/entrypoint.sh" ]
