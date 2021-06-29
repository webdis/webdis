echo Updating Webdis...

sleep 1

echo Pulling the new version of Webdis...

# This assumes you installed Webdis Via Git
git add -A
git stash
git pull

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
php bin/console.php view:cache

echo Webdis has been updated!