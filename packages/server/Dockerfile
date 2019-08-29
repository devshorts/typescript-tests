FROM node:12-alpine AS base

WORKDIR /app

FROM base AS dependencies

# The global package.json only contains build dependencies
COPY package.json .

# cooy the global yarn lock
COPY yarn.lock .

# copy the global yarnrc
COPY .yarnrc .

# copy the global offline packages
COPY npm-packages-offline-cache npm-packages-offline-cache

# install prod stuff
RUN yarn install --offline --production --pure-lockfile --non-interactive

RUN rm -rf npm-packages-offline-cache

# We only copy the dependencies we need
COPY lib/ ./lib

COPY config config

# create the final stage
FROM dependencies AS final

COPY --from=dependencies /app ./app

ENV CONFIG_PATH /app/config

CMD ["node", "lib/index.js"]
