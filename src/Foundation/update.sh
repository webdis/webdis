export WEBDIS_NEW_VERSION=0.0.1

if [ "$WEBDIS_CURRENT_VERSION != $WEBDIS_NEW_VERSION" ]
then
    echo "Version $WEBDIS_CURRENT_VERSION is the same. Not updating."
    return
else
    echo "Updating to Webis version: $WEBDIS_NEW_VERSION"
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