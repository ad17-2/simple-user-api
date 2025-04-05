FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "src/index.js"] 