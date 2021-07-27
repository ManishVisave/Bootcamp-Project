var connection = require('./config');
var bcrypt = require('bcryptjs');

module.exports.change=function(req,res){
var email = req.body.email;
var password = req.body.password;

connection.query('UPDATE users SET password =? WHERE email =?',[password,email],function (error, results, fields) {
            if(error){
                res.json({
                status:false,
                message:error
               })
            }
            else{
                res.json({
                status:true,
                message:"Password Updated"
                })
            }
        
    });    
}