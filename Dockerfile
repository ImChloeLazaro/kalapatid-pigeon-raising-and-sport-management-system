FROM node:12-alpine3.14
WORKDIR /app
COPY package.json /app
RUN npm i && npm cache clean --force
COPY . /app
CMD npm start
EXPOSE 9000