# Stage 1 (Build)
FROM golang:1.19-alpine AS builder

ARG VERSION
RUN apk add --update --no-cache git make
WORKDIR /app/
RUN git clone https://github.com/Ashu11-A/egg-wings .
COPY go.mod go.sum /app/
RUN go mod download
COPY . /app/
RUN CGO_ENABLED=0 go build \
    -ldflags="-s -w -X github.com/pterodactyl/wings/system.Version=$VERSION" \
    -v \
    -trimpath \
    -o wings \
    wings.go

FROM alpine:latest

LABEL author="Ashu" maintainer="Matheusn.biolowons@gmail.com"

RUN apk update

RUN apk add --no-cache --virtual=build-dependencies --upgrade \
    file \
    git \
    wget \
    jq \
    tar \
    unzip \
    curl

# Remove o link simbólico para o shell padrão e cria um novo link simbólico para o bash
RUN apk add --no-cache bash fakeroot
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

COPY --from=builder /app/wings /home/container/

RUN echo "UTC" > /etc/timezone

USER container
ENV  USER container
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD [ "bash", "/entrypoint.sh" ]