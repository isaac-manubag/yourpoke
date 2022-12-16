FROM node:16.18.1-alpine3.15

RUN apk update && apk add --no-cache bash curl tzdata

WORKDIR /app

COPY package.json .

RUN npm install --ignore-engines --quiet

COPY . .

EXPOSE 6969

CMD ["npm", "run", "dev"]
