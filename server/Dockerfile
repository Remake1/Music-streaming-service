FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 3000
CMD [ "yarn", "run", "start:prod" ]