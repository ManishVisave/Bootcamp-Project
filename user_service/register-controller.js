var connection = require('./config');

var bcrypt = require('bcryptjs');

/*
{
    "name" : "neha",
    "email": "neha@b.com",
    "password":"neha",
    "mobile" : "1234567889",
    "whatsapp":"1233456789",
    "location":"nagpur"   
}
*/ 

module.exports.register=function(req,res){
  var today = new Date();
  
  var users={
    "name" :req.body.name,
    "email" :req.body.email,
    "password":bcrypt.hashSync(req.body.password, 8),
    "mobile":req.body.mobile,
    "whatsapp":req.body.whatsapp,
    "location":req.body.location
  }
  connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
    if (error) {
      res.json({
          status:false,
          message: error
      })
    }else{
        res.json({
          status:true,
          data:results,
          message:'user registered sucessfully'
      })
    }
  });
}
