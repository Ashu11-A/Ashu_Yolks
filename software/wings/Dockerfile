FROM gcr.io/distroless/static:latest

RUN echo "ID=\"distroless\"" > /etc/os-release

USER container
ENV  USER container
ENV HOME /home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD [ "bash", "/entrypoint.sh" ]