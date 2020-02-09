FROM node:13-alpine
WORKDIR /usr/src/buhgalters-front
COPY package.json /usr/src/buhgalters-front/package.json
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]