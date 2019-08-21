#!/usr/bin/env bash

cp ../yarn.lock .
docker build -t server .
