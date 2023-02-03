FROM node:18-alpine
WORKDIR /dist
COPY package.json .
RUN npm install
COPY . .
EXPOSE 49090
CMD ["node", "index.js"]