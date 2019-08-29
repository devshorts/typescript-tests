#!/usr/bin/env bash

set -auxe

cp ../../yarn.lock .
cp ../../.yarnrc .
cp -R ../../npm-packages-offline-cache/ ./npm-packages-offline-cache/

docker build -t server .

rm -rf ./yarn.lock
rm -rf ./.yarnrc
rm -rf npm-packages-offline-cache
