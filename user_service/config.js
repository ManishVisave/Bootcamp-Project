var mysql      = require('mysql');

var connection = mysql.createConnection({
    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // port: process.env.DB_PORT,
    // database: process.env.DB_DATABASE

    host : "propertydb.cidwwfie3bwp.ap-south-1.rds.amazonaws.com",
    user : "test",
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