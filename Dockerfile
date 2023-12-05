# Building the server
FROM node:18-alpine AS server-builder
WORKDIR /usr/app
COPY ./server .
RUN npm install
CMD ["npm", "run", "start"]

# WebSocket Server
FROM node:18-alpine AS websocket-builder
WORKDIR /usr/app
COPY ./websocket .
RUN npm install
CMD ["npm", "run", "start"]