FROM node:6.3.1

RUN mkdir /src
WORKDIR /src

RUN apt-get update && apt-get install -y --no-install-recommends \
    vim-nox \
    && rm -rf /var/lib/apt/lists/*

ADD package.json package.json
RUN npm install --production

ADD . /src
EXPOSE 8080

RUN npm run build
CMD ["node", "/src/server/index.js"]
