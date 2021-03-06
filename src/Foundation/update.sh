#!/bin/bash

export WEBDIS_NEW_VERSION="0.0.6-alpha"

echo " "

sleep 2

if [ "$(printf '%s\n' "$WEBDIS_NEW_VERSION" "$WEBDIS_CURRENT_VERSION" | sort -V | head -n1)" = "$WEBDIS_NEW_VERSION" ]; then 
        echo "Already using the lastest version."
        echo "Version ${WEBDIS_NEW_VERSION} == ${WEBDIS_CURRENT_VERSION}"
        exit
 else
        echo "Updating to ${WEBDIS_NEW_VERSION}"
 fi

echo Running update script...

echo Reinstalling Composer and NPM dependencies...

# Runs these so we can install our dependencies
composer install
npm install

echo Compiling CSS and Javascript...

# If you are in development, remove --production
npx mix --production

echo Fixing file owning issues...

# Runs these so our files are owned correctly be the correct user and group, and fixes the storage and bootstrap issues
sudo chown -R $USER:www-data bootstrap/ # If your webserver doesn't use www-data, change this.
sudo chown -R $USER:www-data storage/
chmod -R 775 bootstrap/
chmod -R 775 storage/

echo Resetting Caches

# These reset the config and view caches.
php bin/console.php config:cache
php bin/console.php view:reset

sleep 2

echo Webdis has been updated!
echo "This update includes the following new features:"
echo " - Added the FLUSHALL and APPEND commands, However FLUSHALL is disabled by default."
echo "This update includes the following new bug fixes:"
echo " - Fixed issue with SADD sometimes not working correctly"