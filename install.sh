echo "The installer script is not yet ready, please wait for us to finish it"

echo "Changing ownership of bootstrap/ and storage/"
echo "This will make the user owning these $USER and the group www-data. If the either is incorrect, please change that."
echo " "
echo "If this is incorrect cancel the script now"
sleep 5
echo "You may need to enter your password as this requires SUDO"
sudo chown -R $USER:www-data ./bootstrap
sudo chown -R $USER:www-data ./storage

echo "Ownership set!"

echo "Now setting the ownership permissions"
chmod -R 775 ./bootstrap
chmod -R 775 ./storage

echo "Permissions set!"

echo "Now copying .env.example to .env"

cp .env.example .env

echo "After this, please be sure to edit the configuration file to your liking"

echo "Installing Composer dependencies"

composer install

echo "Installing npm dependencies"

npm install

echo "Running Mix"

npx mix

echo " "

echo "Done! Now please be sure run php bin/console.php config:cache and php bin/console.php view:reset"
echo "These commands will help with Webdis running faster. Note that you must run the config:cache command AFTER chaning the .env file."