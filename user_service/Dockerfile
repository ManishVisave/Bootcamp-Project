# specify the node base image with your desired version node:<version>
FROM node:latest

WORKDIR /home/app/user


RUN npm install express
RUN npm install jsonwebtoken
RUN npm install mysql
RUN npm install bcryptjs 
RUN npm install jwt-decode 


RUN mkdir src
COPY . src/


EXPOSE 8081

CMD ["node", "src/index.js"]