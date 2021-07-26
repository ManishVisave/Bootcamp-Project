var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'mysqldb',
  port      : '3306',
  user     : 'test',
  password : 'test@123',
  database : 'test'

  
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log(err);
}
});
module.exports = connection;