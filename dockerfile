FROM node:20.13.1-bullseye-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN apt-get update && apt-get install -y curl
RUN npm install --no-audit
COPY . .
RUN npm run build
CMD [ "node", "dist/main.js" ]