# specify the node base image with your desired version node:<version>
FROM node:latest

WORKDIR /home/app/property
RUN npm cache clear --force
RUN npm install connect-multiparty
RUN npm install --save aws-sdk
RUN npm install express
RUN npm install mysql
RUN npm install node-fetch
RUN npm install axios
RUN npm install jsonwebtoken
RUN npm install jwt-decode



RUN mkdir src
COPY . src/

# replace this with your application's default port
EXPOSE 8888

CMD ["node", "src/app.js"]
