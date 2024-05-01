FROM node:22 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:api-server && npm prune --production

FROM node:22
RUN npm install pm2 -g
ENV NODE_ENV production
ENV PORT 8080
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node --from=build /usr/src/app/dist /usr/src/app/dist
COPY --chown=node:node . /usr/src/app
EXPOSE 8080
CMD [ "pm2-runtime", "start", "npm run start:api-server" ]
