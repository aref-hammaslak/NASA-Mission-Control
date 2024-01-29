FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY client/package*.json client/
RUN npm run install-client 


COPY server/package.json server/
RUN npm run install-server --only=production && npm cache clean --force && npm install -g typescript


COPY client/ client/
RUN npm run build-client

COPY server/ server/



CMD [ "npm", "start" ]

EXPOSE 8000