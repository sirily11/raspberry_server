FROM node:8.12
WORKDIR /usr/src/server/react-display
COPY ./package.json ./
RUN npm install
CMD [ "npm run-script build" ]