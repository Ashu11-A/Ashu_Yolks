#!/bin/bash
sleep 1

cd /home/container

dockerd -H unix:///tmp/docker.sock -H tcp://0.0.0.0:2376 &
sleep 5

# Replace Startup Variables
MODIFIED_STARTUP=`eval echo $(echo ${STARTUP} | sed -e 's/{{/${/g' -e 's/}}/}/g')`
echo ":/home/container$ ${MODIFIED_STARTUP}"
# Run the Server
${MODIFIED_STARTUP}