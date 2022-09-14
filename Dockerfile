FROM node:17-slim
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY . . 
EXPOSE 3000
CMD [ "node", "server.js" ]
