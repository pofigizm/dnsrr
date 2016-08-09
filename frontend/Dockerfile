FROM node:6.3.1

RUN mkdir /src
WORKDIR /src

ADD package.json package.json
RUN npm install --production

ADD . /src
EXPOSE 8080

CMD ["node", "/src/server/index.js"]
