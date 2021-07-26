# specify the node base image with your desired version node:<version>
FROM node:latest

WORKDIR /home/app/user


RUN npm install express
RUN npm install mysql
 

RUN mkdir src
COPY . src/


EXPOSE 8081

CMD ["node", "src/index.js"]