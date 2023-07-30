# Specify Node Version and Image for the development stage
FROM node:18.12.1 AS development

# Specify the working dir
WORKDIR /oykuparlak/src/app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci
RUN npm install

EXPOSE 3000

# Production stage
FROM node:18.12.1 AS production

# Set the NODE_ENV environment variable
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Specify the working dir for the production stage
WORKDIR /oykuparlak/src/app


COPY --from=development /oykuparlak/src/app/ . 


EXPOSE 3000

CMD ["node", "dist/main"]