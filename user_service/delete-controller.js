var connection = require('./config');

module.exports.delete=function(req,res){
    var email=req.body.email;
        connection.query('DELETE FROM users WHERE email= ?' ,[email],function (error, results, fields) {
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
  
    
    

