const express=require("express");
const app = express();
process.env.SECRET_KEY="thisismysecretkey";
//parse request of content type - application/json
app.use(express.json());

//parse request content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));

const{ checkToken } = require("./auth/token_validation");

var authenticateController=require('./authenticate-controller');
var registerController=require('./register-controller');
var deleteController = require('./delete-controller');
var changeController = require('./change-controllers');
var detailsController = require('./details-controller');

//route to handle login ,registration , delete user and change password  
app.post('/api/register',registerController.register);
app.post('/api/authenticate',authenticateController.authenticate);
app.post('/api/delete',checkToken,deleteController.delete);
app.post('/api/change',checkToken,changeController.change);
app.get('/api/details',checkToken,detailsController.details);

app.listen(8081, () =>console.log('Server Running on 8081'));

