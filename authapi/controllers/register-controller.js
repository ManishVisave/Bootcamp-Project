var connection = require('./config');
//var bcrypt = require('bcrypt');

module.exports.register=function(req,res){
  var today = new Date();
  
  var users={
    "name" :req.body.name,
    "email" :req.body.email,
    "password":req.body.password,
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
