# Specify Node Version and Image for the development stage
FROM node:18.12.1 AS development

# Specify the working dir
WORKDIR /oykuparlak/frontend/src/app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

EXPOSE 4200

