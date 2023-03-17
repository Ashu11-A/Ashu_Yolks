# Stage 1 (Build)
FROM alpine:latest AS builder

RUN echo "ID=\"distroless\"" > /etc/os-release

# Stage 2 (Final)
FROM gcr.io/distroless/static:latest
COPY --from=builder /etc/os-release /etc/os-release

CMD [ "/home/container/wings", "--config", "/home/container/config.yml" ]

EXPOSE 8080