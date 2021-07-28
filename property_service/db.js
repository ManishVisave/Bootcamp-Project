

const mysql = require('mysql')

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});

async function getExists(table,searchColName,searchData){
    let val = new Promise(async (resolve,reject)=>{
        data = [table,searchColName,searchData]
        await con.query("SELECT * FROM ?? WHERE ??=?",data,(err,result)=>{
            if(result != undefined && result.length != 0){
                let key = Object.keys(result[0])[0]
                resolve(result[0][key])
            }else{
                reject(false)
            }
        })
    })
    return val.then((res)=>{
        return res;
    }).catch((err) => {
        return err;
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

getSQLInsertStmt = (tableName) =>{
    let sql = ""
    if(tableName === "country"){
        sql = "INSERT INTO country (country_name) VALUES(?)"
    }else if(tableName === "city"){
        sql = "INSERT INTO city (country_id,city_name) VALUES(?,?)"
    }else if(tableName === "locality"){
        sql = "INSERT INTO locality (city_id,location_name,location_pin) VALUES(?,?,?)"
    }else if(tableName === "currency"){
        sql = "INSERT INTO currency (currency_name) VALUES(?)"
    }else if(tableName === "property"){
        sql = "INSERT INTO property (location_id,address,currency_id,length,breadth,area,price,description,user_id) VALUES(?,?,?,?,?,?,?,?,?)"
    }else{
        sql = "INSERT INTO photo VALUES(?,?)"
    }

    return sql

}

insertOne = (tableName,data) => {

    let sql = getSQLInsertStmt(tableName)
    data = Object.values(data)
    return new Promise((resolve,reject)=>{
        con.query(sql,data,(err,result)=>{ 
            if(result === undefined){
                console.log(err)
                reject("false")
            }else{
                resolve(result.insertId)
            }
        })
    })
    
}

insertRecord = async (propertyRecord) => {
    // console.log(propertyRecord)
    var countryId = 0;
    var currencyId = 0;
    var cityId = 0;
    var localityId = 0;
    var propertyId = 0;
    let countryExists = false;

    countryExists =  await getExists("country","country_name",propertyRecord.country)

    if(!countryExists){
        console.log("Came Here 1")
        let insertVal =  await insertOne("country",propertyRecord.country)
        if(insertVal === "false") throw Error("Error in Adding Country")
        else countryId = insertVal
    }else{
        countryId = countryExists
    }
    
    let cityExists = await getExists("city","city_name",propertyRecord.city)
    if(!cityExists){
        let data = {"country_id" : countryId, "city_name": propertyRecord.city}
        
        let insertVal =  await insertOne("city",data)
        if(insertVal === "false") throw Error("Error in Adding Country")
        else cityId = insertVal
    }else{
        cityId = cityExists
    }
    
    // console.log("Came Here 2")
    let localityExists =  await getExists("locality","location_name",propertyRecord.location)
    // console.log("Locality : "+localityExists)

    if(!localityExists){

        let data = {"city_id" : cityId, "location_name": propertyRecord.location, "location_pin": propertyRecord.pin}
        let insertVal = await insertOne("locality",data)
        if(insertVal === "false") throw Error("Error in Adding Country")
        else localityId = insertVal
    
    }else{
        localityId = localityExists
    }

    let currencyExists =  await getExists("currency","currency_name",propertyRecord.currency)
    if(!currencyExists){
        let data = {"currency_name" : propertyRecord.currency}
        let insertVal =  await insertOne("currency",data)
        if(insertVal === "false") throw Error("Error in Adding Country")
        else currencyId = insertVal
    }else{
        currencyId = currencyExists
    }

    // console.log("Location Id: "+JSON.stringify(localityId))
    // console.log("Currency Id: "+JSON.stringify(currencyId))
    

    data = {
        "location_id":localityId,
        "address":propertyRecord.address,
        "currency_id":currencyId,
        "length":propertyRecord.length,
        "breadth":propertyRecord.breadth,
        "area": parseInt(propertyRecord.length, 10)*parseInt(propertyRecord.breadth, 10),
        "price":parseFloat(propertyRecord.price),
        "description": propertyRecord.description,
        "user_id":propertyRecord.user_id
    }    
    
    
    let insertVal = await insertOne("property",data)
    if(insertVal === "false") return "Error In Adding Property"
    else{
        propertyId = insertVal
        counter = 0
        return new Promise(async (resolve,reject) => {
            if(propertyRecord.files.length != 0){
                for(let i = 0; i < propertyRecord.files.length; i++){
                    data = {"property_id":propertyId, "photo":propertyRecord.files[i]}
                    // console.log("data: "+JSON.stringify(data))
                    let photoploaded = await insertOne("photo",data)
                    // console.log("Photoooo: "+photoploaded)
                    if(photoploaded !== "false") counter++
                }
                if(counter == 0)
                    return "Photos Not Uploaded"
                else if(counter < propertyRecord.files.length)
                    return "Some Photos Not Uploaded"
                else
                    resolve("Property Added.....")
            }
        })
    }


}



recommended = async (user_city) => {
    console.log("User_city " + user_city)
    return new Promise(async (resolve,reject) => {
        let sql = 'SELECT * FROM property WHERE location_id in (select location_id from locality where city_id in (select city_id from city where city_name = (?)))'
        await con.query(sql,user_city,(err,result)=>{
            console.log(err)
            if(result.length != 0) resolve(result)
            else reject("No properties in your city")
        })
    })

}

authorizedToDelete = (data) => {
    return new Promise((resolve,reject)=>{
        con.query('SELECT * FROM property WHERE ??=? and ??=?',data,(err,result)=>{
            if(result === undefined){
                resject(false)
                // console.log("Data Undefined: "+err)
            }else{
                // console.log("Data defined: "+JSON.stringify(result))
                resolve(true)
            }
        })
    })
}

deleteRecord = async (propertyId,userId) => {

    let authorized = false
    let tmp = ["property_id",propertyId,"user_id",userId]
    authorized = await authorizedToDelete(tmp)

    return new Promise(async (resolve,reject)=>{
        if(authorized){
            await con.query('DELETE FROM property WHERE property_id = ?',propertyId,(err,result)=>{
                if(result === undefined){
                    reject("Error in Deleting...")
                }else{
                    resolve("Record Deleted")
                }
            })
        }else{
            reject("Error In deleting...")
        }
    })
}

exports.con = con;
exports.retriveData = getAllData;
exports.insertRecord = insertRecord
exports.deleteRecord = deleteRecord
exports.recommended = recommended