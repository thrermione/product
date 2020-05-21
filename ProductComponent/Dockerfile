FROM node:10

WORKDIR /src/app

COPY package*.json ./

RUN apt-get update -y

RUN apt-get install default-mysql-client -y

RUN apt-get install vim -y

RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm", "start"]