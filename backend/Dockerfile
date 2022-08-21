FROM node:16

ARG BACKEND_PORT

ENV PORT=${BACKEND_PORT:-3344}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE ${PORT}

CMD ["node", "build/server.js"]