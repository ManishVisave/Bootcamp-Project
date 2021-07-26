var connection = require('./config');
var bcrypt = require("bcryptjs");
var jwt=require('jsonwebtoken');

module.exports.authenticate=function(req,res){
    var email=req.body.email;
    var password=req.body.password;

    connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:error
            })
      }else{
        if(results.length >0){
          bcrypt.compare(password, results[0].password, function(err, ress) {
            
              if(!ress){
                  res.json({
                    status:false,                  
                    message:err,
                    message:"Email and password does not match"
                  });
              }else{           
                var token=jwt.sign(results[0],process.env.SECRET_KEY,{
                  expiresIn:5000
              });         
                  res.json({
                      status:true,
                      token :token,
                      
                  })
              }
          });         
      }
        else{
          res.json({
              status:false,    
            message:"Email does not exits"
          });
        }
      }
    });
}
