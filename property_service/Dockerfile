# specify the node base image with your desired version node:<version>
FROM node:latest

WORKDIR /home/app/property


RUN npm install express
RUN npm install mysql


RUN mkdir src
COPY . src/

# replace this with your application's default port
EXPOSE 8888

CMD ["node", "src/app.js"]
