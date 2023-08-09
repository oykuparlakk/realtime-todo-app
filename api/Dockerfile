FROM node:18.12.1 AS development

# Specify the working dir
WORKDIR /oykuparlak/src/app

COPY package*.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm ci
RUN npm run build

EXPOSE 3000

FROM node:16.16.0 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /oykuparlak/src/app

COPY --from=development /oykuparlak/src/app/ .

EXPOSE 3000

CMD ["node", "dist/main" ]
