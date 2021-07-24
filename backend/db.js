const mysql = require('mysql')

var con = mysql.createConnection({
    host: "mysqldb",
    user: "test",
    password: "test@123",
    port: 3306,
    database: "property"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

getExists = (table,searchColName,searchData) => {
    return new Promise(async (resolve,reject)=>{
        data = [table,searchColName,searchData]
        // console.log("Exists "+ table+" "+ searchData)
        await con.query("SELECT * FROM ?? WHERE ??=?",data,(err,result)=>{
            if(result.length != 0){
                result = JSON.stringify(result);
                result = JSON.parse(result)
                if(data === undefined){
                    reject(false)
                }else{
                    let key = Object.keys(result[0])[0]
                    console.log(result[0][key])
                    resolve(result[0][key])
                }
            }else{
                reject(false)
            }

            
        })
    })
}

getAllData = () =>{
    return new Promise(function(resolve, reject){
      con.query(
          "SELECT * FROM property",
          (err, rows)=>{
              if(rows === undefined){
                  reject(new Error("Error rows is undefined"));
              }else{
                  resolve(rows);
              }
          }
      )}
)}

insertOne = (table,data) => {
    console.log(table + "  " + data)
    con.query("INSERT INTO ?? SET ?",[table,data],(err,data)=>{
        console.log("Inside Insert One " + table + " " +err)
        if(data === undefined){
            return "false"
        }else{
            return data.insertId
        }
    })
}

insertRecord = (propertyRecord) => {
    // console.log(propertyRecord)
    let countryId = 0;
    let currencyId = 0;
    let cityId = 0;
    let localityId = 0;
    let propertyId = 0;
    
    let countryExists =  getExists("country","country_name",propertyRecord.country)
    countryExists.then(result => {
        countryId = result
    }).catch(async err => {
        countryId =  await insertOne("country",propertyRecord.country.toString())
        console.log("Country Id: " + countryId)
        if(!countryId) return "Error In Adding Country"
    })
    
    // if(!countryExists){
    //     countryId =  insertOne("country",propertyRecord.country)
    //     console.log("Country Id " + countryId)
    //     if(!countryId) return "Error In Adding Country"
    // }else{
    //     countryExists.then(result => { countryId = result })
    //     console.log("Country Id " + countryId)
        
    // }
    
    // let cityExists =  getExists("city","city_name",propertyRecord.city)
    // if(!cityExists){
    //     let data = {"country_id" : countryId, "city_name": propertyRecord.city}
    //     cityId =  insertOne("country",data)
    //     console.log("City Id " + cityId)
    //     if(!cityId) return "Error In Adding City"
    // }else{
    //     cityExists.then(result => { cityId = result })
    //     console.log("City Id " + cityId)
        
    // }

    // let localityExists =  getExists("locality","location_name",propertyRecord.location)
    // if(!localityExists){
    //     let data = {"city_id" : cityId, "location_name": propertyRecord.location, "location_pin": propertyRecord.pin}
    //     localityId =  insertOne("locality",data)
    //     if(!localityId) return "Error In Adding City"
    // }

    // let currencyExists =  getExists("currency","currency_name",propertyRecord.currency)
    // if(!currencyExists){
    //     let data = {"currency_name" : propertyRecord.currency}
    //     currencyId =  insertOne("currency",data)
    //     if(!localityId) return "Error In Adding City"
    // }
    data = {
        "location_id":localityId,
        "address":propertyRecord.address,
        "currency_id":currencyId,
        "length":propertyRecord.length,
        "breadth":propertyRecord.breadth,
        "area": parseInt(propertyRecord.length, 10)*parseInt(propertyRecord.breadth, 10),
        "price":parseFloat(propertyRecord.price),
        "description": propertyRecord.description
    }
    return new Promise(async (resolve,reject)=>{
        // console.log("Length: "+propertyRecord.length)
        // let insertVal = insertOne("property",data)
        // if(insertVal === "false") reject("Data cannot be added")
        // else
         resolve("Record Added")
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
exports.retriveData = getAllData;
exports.insertRecord = insertRecord
exports.deleteRecord = deleteRecord
