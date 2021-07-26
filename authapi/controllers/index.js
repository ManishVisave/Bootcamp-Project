const express=require("express");
var jwt= require("jsonwebtoken");

const app = express();
var router=express.Router();

//parse request of content type - application/json
app.use(express.json());

//parse request content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));

var authenticateController=require('./authenticate-controller');
var registerController=require('./register-controller');
var deleteController = require('./delete-controller');
var changeController = require('./change-controllers');

process.env.SECRET_KEY="thisismysecretkey";


//route to handle login and registration 
app.post('/api/register',registerController.register);
app.post('/api/authenticate',authenticateController.authenticate);
app.post('/api/delete',deleteController.delete);
app.post('/api/change',changeController.change);

app.use('/secure-api',router);
// validation middleware
router.use(function(req,res,next){
    var token=req.body.token || req.headers['token'];
    if(token){
        jwt.verify(token,process.env.SECRET_KEY,function(err,ress){
            if(err){
                res.status(500).send('Token Invalid');
            }else{
                next();
            }
        })
    }else{
        res.send('Please send a token')
    }
})
router.get('/home',function(req,res){
    res.send('Token Verified')
})


app.listen(8081, () =>console.log('Server Running on 8081'));

