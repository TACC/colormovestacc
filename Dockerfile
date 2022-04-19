FROM node:latest
WORKDIR /colormoves
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "server.js"]
