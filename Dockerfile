FROM node:14 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:server-libs && npm prune --production

FROM node:14
RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_x86_64
RUN chmod +x /usr/local/bin/dumb-init
ENV NODE_ENV production
ENV PORT 8080
ENV NODE_PATH ./dist:./node_modules
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node --from=build /usr/src/app/dist /usr/src/app/dist
COPY --chown=node:node . /usr/src/app
EXPOSE 8080
CMD [ "dumb-init", "node", "./projects/ccf-api/start-server.js" ]
