var mysql      = require('mysql');

var connection = mysql.createConnection({
  host: "mysqldb",
    user: "test",
    password: "test@123",
    port: 3306,
    database: "property"

  
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log(err);
}
});
module.exports = connection;