var mysql      = require('mysql');

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log(err);
}
});
module.exports = connection;