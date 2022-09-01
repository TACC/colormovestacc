FROM node:latest
LABEL maintainer="TACC-ACI-WMA <wma_prtl@tacc.utexas.edu>"
WORKDIR /colormoves/
COPY ./src /colormoves/src
WORKDIR /colormoves/src
RUN npm install
EXPOSE 8888
ENTRYPOINT ["node", "/colormoves/src/server.js"]
