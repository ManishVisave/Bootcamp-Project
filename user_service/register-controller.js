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
async function getuserByEmail(email){

  let val = new Promise(async (resolve,reject)=>{
      await connection.query("SELECT user_id FROM users WHERE email=?",email,(err,result)=>{
        console.log(err)
          if(result != undefined && result.length != 0){
            
              resolve(true)
          }else{
              reject(false)
          }
      })
  })
  return val.then((res)=>{
      return true;
  }).catch((err) => {
      return false;
  })
}


module.exports.register=async function(req,res){
  var today = new Date();
  var emailExists = await getuserByEmail(req.body.email);
  console.log(emailExists);
  if(!emailExists ){
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
         
          message:'user registered sucessfully'
      })
    }
  });
}
else{
  
    res.json({
      status:false,
     
      message:'email already Exists !!'
  
})
}
}
