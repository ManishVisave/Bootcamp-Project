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

insertRecord = (data) => {
    // console.log(data)
    return new Promise((resolve,reject)=>{
        con.query('INSERT INTO demo SET ?',data,(err,data)=>{
            if(data === undefined){
                reject(new Error(err))
            }else{
                resolve(data)
            }
        })
    })

}

deleteRecord = (id) => {
    return new Promise((resolve,reject)=>{
        con.query('DELETE FROM demo WHERE id = ?',id,(err,data)=>{
            if(data === undefined){
                reject(new Error(err))
            }else{
                resolve(data)
            }
        })
    })
}

exports.con = con;
exports.addData = addData;
exports.retriveData = getAllData;
exports.insertRecord = insertRecord
exports.deleteRecord = deleteRecord
