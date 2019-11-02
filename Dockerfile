FROM node

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN yarn

EXPOSE 3000
