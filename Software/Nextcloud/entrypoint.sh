#!/bin/ash
sleep 1

# start cron
echo "*/5  *  *  *  * php -f /var/www/nextcloud/cron.php" >> /etc/crontabs/root
crond -l 2 -f > /dev/stdout 2> /dev/stderr &

cd /home/container

# Replace Startup Variables
MODIFIED_STARTUP=`eval echo $(echo ${STARTUP} | sed -e 's/{{/${/g' -e 's/}}/}/g')`
echo ":/home/container$ ${MODIFIED_STARTUP}"

# Run the Server
${MODIFIED_STARTUP}