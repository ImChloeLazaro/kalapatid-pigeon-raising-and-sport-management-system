FROM node:latest
WORKDIR /app
COPY package.json /app
RUN npm i && npm cache clean --force
COPY . /app
CMD npm start
EXPOSE 9000
EXPOSE 27017