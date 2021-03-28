#!/bin/bash

echo What should the version be?
read VERSION

docker build -t lucagug/redditclone:$VERSION .
docker push lucagug/redditclone:$VERSION
ssh root@165.232.158.45 "docker pull lucagug/redditclone:$VERSION && docker tag lucagug/redditclone:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"