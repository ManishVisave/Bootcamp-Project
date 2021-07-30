var connection = require('./config');
const jwt_decode = require('jwt-decode');

module.exports.delete=function(req,res){
    let token = req.get("authorization");
    var decoded = jwt_decode(token);
    var email=decoded.user_id;
        connection.query('DELETE FROM users WHERE user_id= ?' ,[email],function (error, results, fields) {
                    if(error){
                        res.json({
                        status:false,
                        message:error
                       })
                    }
                    else{
                        res.json({
                        status:true,
                        message:"User Deleted"
                        })
                    }
                
            });    

        }
  
    
    

