FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./backend/package*.json /usr/src/app/

RUN npm install

COPY ./backend/ /usr/src/app

EXPOSE 3900

CMD [ "npm", "start" ]
