var mysql = require('mysql');
process.env.AWS_ACCESS_KEY_ID="AKIA2UPAXHZ3X7GX7YXR"
process.env.AWS_SECRET_ACCESS_KEY='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'
process.env.AWS_DEFAULT_REGION='ap-south-1'
process.env.DB_HOST='propertydb.cidwwfie3bwp.ap-south-1.rds.amazonaws.com'
process.env.DB_USER='test'
process.env.DB_PASSWORD='testingproperty'
process.env.DB_DATABASE='property'
process.env.DB_PORT=3306
process.env.CURRENCY_API_KEY='8YXiPg7pJdaLcnGjAVcNKyxQ2cy8B3'


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