echo Updating Webdis...

sleep 1

export WEBDIS_CURRENT_VERSION=0.0.1

echo Pulling the new version of Webdis...

# This assumes you installed Webdis Via Git
git add -A
git stash
git pull