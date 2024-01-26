FROM node:latest

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD ["npm", "run", "dev"]
