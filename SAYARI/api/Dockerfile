# api/Dockerfile
FROM node:18

WORKDIR /usr/src/app

# installing dependencies 
COPY package.json tsconfig.json ./
RUN npm install

COPY src ./src

# entrypoints 
CMD ["npm", "run", "dev"]