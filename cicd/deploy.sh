#!/usr/bin/env bash

if [ "$TRAVIS_BRANCH" == "master" ]; then
  yarn workspaces run package
else
  echo "Skipping deploy since branch is $TRAVIS_BRANCH"
fi
