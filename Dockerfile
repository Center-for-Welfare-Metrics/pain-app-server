# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install
RUN npm run build

FROM node:16

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY --from=0 /usr/src/app/dist ./dist
EXPOSE 8080
CMD npm start