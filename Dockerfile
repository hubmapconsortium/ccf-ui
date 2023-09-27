FROM node:18 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:server-libs && npm prune --production

FROM node:18
RUN npm install pm2 -g
ENV NODE_ENV production
ENV PORT 8080
ENV NODE_PATH ./dist:./node_modules
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node --from=build /usr/src/app/dist /usr/src/app/dist
COPY --chown=node:node . /usr/src/app
EXPOSE 8080
CMD [ "pm2-runtime", "./projects/ccf-api/start-server.js" ]
