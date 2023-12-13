FROM node:18-alpine

WORKDIR /usr/server/app

COPY ./package*.json ./

RUN npm install --no-dev

COPY ./ .

CMD ["npm", "run" ,"start"]
