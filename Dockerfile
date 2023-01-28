FROM node:18

WORKDIR /ReactToDoListBackend
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]