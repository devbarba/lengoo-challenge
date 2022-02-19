FROM node:14.17.0-alpine

MAINTAINER João Harbs <harbspj@gmail.com>

RUN apk --no-cache add curl

WORKDIR /usr/lengoo/app

COPY package.json .

COPY .env.example .env

RUN npm install --quiet

COPY . .
