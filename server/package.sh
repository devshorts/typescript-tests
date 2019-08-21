#!/usr/bin/env bash

set -auxe

cp ../yarn.lock .
docker build -t server .
rm -rf ./yarn.lock
