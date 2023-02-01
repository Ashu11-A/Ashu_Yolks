#!/bin/ash
sleep 1

cd /home/container

# Replace Startup Variables
MODIFIED_STARTUP=`eval echo $(echo ${STARTUP} | sed -e 's/{{/${/g' -e 's/}}/}/g')`
echo ":/home/container$ ${MODIFIED_STARTUP}"

crond -l 2 -f > /dev/stdout 2> /dev/stderr &
# Run the Server
${MODIFIED_STARTUP}