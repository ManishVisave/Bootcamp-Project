# specify the node base image with your desired version node:<version>
FROM node:latest

WORKDIR /home/app/property

RUN npm install s3fs
RUN npm install connect-multiparty
RUN npm install --save aws-sdk
RUN npm install express
RUN npm install mysql
RUN npm install node-fetch
RUN npm install axios

RUN mkdir src
COPY . src/

# replace this with your application's default port
EXPOSE 8888

CMD ["node", "src/app.js"]
