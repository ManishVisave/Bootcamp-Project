var mysql      = require('mysql');

var connection = mysql.createConnection({
    host: "propertydb.cidwwfie3bwp.ap-south-1.rds.amazonaws.com",
    user: "test",
    password: "testingproperty",
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