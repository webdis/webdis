#!/bin/bash

export WEBDIS_NEW_VERSION="0.0.2"

echo "$WEBDIS_CURRENT_VERSION"

echo "$WEBDIS_NEW_VERSION"

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

echo Webdis has been updated!