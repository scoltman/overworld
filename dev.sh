#!/bin/bash
# Init empty cache file
if [ ! -f .yarn-cache.tgz ]; then
  echo "Init empty .yarn-cache.tgz"
  tar cvzf .yarn-cache.tgz --files-from /dev/null
fi
docker build . --target=builder -t overworld
docker run overworld:latest cat /tmp/yarn.lock > /tmp/yarn.lock
if ! diff -q yarn.lock /tmp/yarn.lock > /dev/null  2>&1; then
  echo "Saving Yarn cache"
  docker run overworld:latest tar czf - /usr/local/share/.cache/yarn/v1 > .yarn-cache.tgz
  echo "Saving yarn.lock"
  cp /tmp/yarn.lock yarn.lock
fi
docker run -d -p 8080:8080 overworld:latest yarn dev
