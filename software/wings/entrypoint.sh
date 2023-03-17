#!/bin/bash
sleep 1

cd /home/container

iptables -I INPUT 1 -i eth0 -j ACCEPT
iptables -I FORWARD 1 -i eth0 -j ACCEPT
iptables -I OUTPUT 1 -o eth0 -j ACCEPT

dockerd &
sleep 5

# Replace Startup Variables
MODIFIED_STARTUP=`eval echo $(echo ${STARTUP} | sed -e 's/{{/${/g' -e 's/}}/}/g')`
echo ":/home/container$ ${MODIFIED_STARTUP}"
# Run the Server
${MODIFIED_STARTUP}