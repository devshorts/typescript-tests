FROM node:12-alpine AS base

WORKDIR /app

ENV NODE_ENV=production

FROM base AS dependencies

# We only copy the dependencies we need
COPY dist/ .

# The global package.json only contains build dependencies
COPY package.json .

COPY yarn.lock .
COPY .yarnrc .
ADD npm-packages-offline-cache npm-packages-offline-cache

RUN cat .yarnrc && ls -lah && pwd && yarn install --offline --production --pure-lockfile --non-interactive --cache-folder ./ycache; rm -rf ./ycache

CMD ["node", "src/index.js"]
