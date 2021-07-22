# specify the node base image with your desired version node:<version>
FROM node:latest

WORKDIR /home/app/backend

COPY . .

RUN npm install express
RUN npm install mysql

# replace this with your application's default port
EXPOSE 8888

CMD ["node","app.js"]
