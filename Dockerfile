FROM node:latest
WORKDIR /colormoves
COPY . .
RUN npm install
EXPOSE 3000
ENTRYPOINT ["node", "server.js"]