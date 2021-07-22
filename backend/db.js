const mysql = require('mysql')

var con = mysql.createConnection({
    host: "mysqldb",
    user: "test",
    password: "test@123",
    port: 3306,
    database: "test"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


function addData(data){

}


getAllData = function(){
    return new Promise(function(resolve, reject){
      con.query(
          "SELECT * FROM demo", 
          function(err, rows){                                                
              if(rows === undefined){
                  reject(new Error("Error rows is undefined"));
              }else{
                  resolve(rows);
              }
          }
      )}
)}

exports.con = con;
exports.addData = addData;
exports.retriveData = getAllData;
