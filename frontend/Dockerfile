FROM node:8.9.3-alpine

RUN mkdir /src
WORKDIR /src

RUN apk --no-cache add curl
RUN apk --no-cache add vim

ADD package.json package.json
ADD package-lock.json package-lock.json
RUN npm install --production

ADD . /src
EXPOSE 8080

RUN npm run build
CMD ["node", "/src/server/index.js"]
