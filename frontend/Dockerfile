FROM node:18.12.1 AS development

WORKDIR /oykuparlak/frontend/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4200
