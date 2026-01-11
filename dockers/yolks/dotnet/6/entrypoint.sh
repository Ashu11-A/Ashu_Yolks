#!/bin/bash

cd /home/container || exit 1

startupCommand=$(eval echo "$(echo "${STARTUP}" | sed -e 's/{{/${/g' -e 's/}}/}/g')")

echo ":/home/container$ ${startupCommand}"

exec ${startupCommand}