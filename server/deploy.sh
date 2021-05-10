#!/bin/bash

echo What should the version be?
read VERSION

docker build -t jaymutt78/nexus:$VERSION .
docker push jaymutt78/nexus:$VERSION
ssh root@178.128.10.29  "docker pull jaymutt78/nexus:$VERSION && docker tag jaymutt78/nexus:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"