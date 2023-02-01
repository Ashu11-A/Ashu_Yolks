#!/bin/bash
sleep 1

cd /home/container

# Replace Startup Variables
MODIFIED_STARTUP=`eval echo $(echo ${STARTUP} | sed -e 's/{{/${/g' -e 's/}}/}/g')`
echo ":/home/container$ ${MODIFIED_STARTUP}"

echo "executando crontab"
nohup /usr/sbin/crond -f -l 8 &

# Run the Server
${MODIFIED_STARTUP}