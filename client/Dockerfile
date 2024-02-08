FROM node:lts-alpine
WORKDIR /code
COPY package*.json /code/
RUN yarn add global @vue/cli
RUN yarn install
COPY . .
CMD [ "yarn", "serve" ]