FROM node:12-alpine AS base

WORKDIR /app

ENV NODE_ENV=production

FROM base AS dependencies

# We only copy the dependencies we need
COPY build/ .

# The global package.json only contains build dependencies
COPY package.json .

COPY yarn.lock .

RUN yarn install --production --pure-lockfile --non-interactive --cache-folder ./ycache; rm -rf ./ycache

CMD ["node", "src/index.js"]
