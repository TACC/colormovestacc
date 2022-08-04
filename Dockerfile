FROM node:latest
LABEL maintainer="TACC-ACI-WMA <wma_prtl@tacc.utexas.edu>"
WORKDIR /colormoves
COPY ./src .
RUN npm install
EXPOSE 8888
CMD ["node", "server.js"]
