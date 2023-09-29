FROM node:20

RUN mkdir /app
WORKDIR /app

COPY . .

RUN npm install
RUN npx tsc

CMD ["node", "js/src/app.js"]
