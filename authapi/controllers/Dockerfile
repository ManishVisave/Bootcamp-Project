# specify the node base image with your desired version node:<version>
FROM node:latest

WORKDIR /home/app/api

COPY . .

RUN npm install express
RUN npm install mysql

# replace this with your application's default port
CMD [ "ls" ]
#CMD ["node","index.js"]