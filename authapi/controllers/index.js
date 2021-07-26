const express=require("express");

const app = express();
//parse request of content type - application/json
app.use(express.json());

//parse request content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));

var authenticateController=require('./authenticate-controller');
var registerController=require('./register-controller');


//route to handle login and registration 
app.post('/api/register',registerController.register);
app.post('/api/authenticate',authenticateController.authenticate);


app.listen(8081, () =>console.log('Server Running on 8081'));

