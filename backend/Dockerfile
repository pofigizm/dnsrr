FROM node:8.9.3-alpine

RUN mkdir /src
WORKDIR /src

RUN apk --no-cache add curl
RUN apk --no-cache add vim

ADD nodemon.json nodemon.json
RUN npm install nodemon -g

ADD package.json package.json
ADD package-lock.json package-lock.json
RUN npm install --production

ADD . /src
EXPOSE 3000

CMD ["node", "/src/index.js"]
