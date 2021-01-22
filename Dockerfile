FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json tsconfig.json ./

RUN npm install --only=production

COPY . ./

CMD ["npm", "run", "dev"]