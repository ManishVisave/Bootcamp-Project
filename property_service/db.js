const mysql = require('mysql');
const jwt_decode =require('jwt-decode');

var con = mysql.createConnection({
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

async function getLocationById(searchId){
    let val = new Promise(async (resolve,reject)=>{
        await con.query("SELECT location_name FROM locality WHERE location_id=?",searchId,(err,result)=>{
            console.log("location name :"+result)
            if(result != undefined && result.length != 0){
                resolve(result[0]['location_name'])
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

async function getUserById(searchId){
    let val = new Promise(async (resolve,reject)=>{
        await con.query("SELECT name,email,mobile FROM users WHERE user_id=?",searchId,(err,result)=>{
            console.log("user :"+JSON.stringify(result))
            if(result != undefined && result.length != 0){
                resolve(result)
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

async function getPropertyById(searchId){
    console.log("searchId :"+searchId)
    let val = new Promise(async (resolve,reject)=>{
        await con.query("SELECT user_id FROM property WHERE property_id=?",searchId,(err,result)=>{
            console.log(" :"+err)
            if(result != undefined && result.length != 0){
                resolve(result[0]['user_id'])
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



insertRecord = async (req) => {
    let token = req.get("authorization");
    var decoded = jwt_decode(token);
    userId = decoded.user_id;
    //console.log(JSON.stringify(decoded))
    // console.log(propertyRecord)
    var countryId = 0;
    var currencyId = 0;
    var cityId = 0;
    var localityId = 0;
    var propertyId = 0;
    let countryExists = false;
    console.log(JSON.stringify(req.body))
    propertyRecord = req.body;
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

    // let exchange= 1
    // let price = parseFloat(propertyRecord.price)
    // if(propertyRecord.currency !== "INR"){
    //     exchange = await currency.currencyExchange(propertyRecord.currency,"INR")
    // }
    // price = price*exchange

    // console.log("Exchange: "+exchange)
    data = {
        "location_id":localityId,
        "address":propertyRecord.address,
        "currency_id":currencyId,
        "length":propertyRecord.length,
        "breadth":propertyRecord.breadth,
        "area": parseInt(propertyRecord.length, 10)*parseInt(propertyRecord.breadth, 10),
        "price":parseFloat(propertyRecord.price),
        "description": propertyRecord.description,
        "user_id":userId
    }    
    
    
    let insertVal = await insertOne("property",data)
    if(insertVal === "false") return "Error In Adding Property"
    else{
        propertyId = insertVal
        counter = 0
        return new Promise(async (resolve,reject) => {
            if(propertyRecord.files !== undefined && propertyRecord.files.length != 0){
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
            else{
                resolve("Property Added")
            }
        })
    }


}



recommended = async (req) => {
    
    let token = req.get("authorization");
    var decoded = jwt_decode(token);
    userCity = decoded.location;
    console.log("User_city " + userCity)
    return new Promise(async (resolve,reject) => {
        let sql = 'SELECT * FROM property WHERE location_id in (select location_id from locality where city_id in (select city_id from city where city_name = (?)))'
        await con.query(sql,userCity,async(err,result)=>{
            console.log(err)
            if(result.length != 0){ 
                result = JSON.stringify(result);
                result = JSON.parse(result)
                
                for(let i=0;i<result.length;i++){
                    var location = result[i]['location_id']
                    delete result[i]['location_id']
                    result[i]['location'] =  await getLocationById(location);

                    var user_id = result[i]['user_id']
                    delete result[i]['user_id']
                    result[i]['posted by'] =  await getUserById(user_id)
                }
                resolve(result)}
            else reject("No properties in your city")
        })
    })

}

authorizedToManipulate = (data) => {
    return new Promise((resolve,reject)=>{
        con.query('SELECT * FROM property WHERE ??=? and ??=?',data,(err,result)=>{
            if(result === undefined){
                reject(false)
                // console.log("Data Undefined: "+err)
            }else{
                // console.log("Data defined: "+JSON.stringify(result))
                resolve(true)
            }
        })
    })
}

updateRecord = async (req) => {

    let val = new Promise(async (resolve,reject)=>{
        let token = req.get("authorization");
        var decoded = jwt_decode(token);
        userId = decoded.user_id;
        let authorized = false
        propertyRecord = req.body;
        propUserId = await getPropertyById(propertyRecord.property_id)
        console.log("user id :"+userId)
        if(userId == propUserId){
            console.log("in equal")
            authorized = true;
        }
        else{
            
            reject( "User not authorised to update")
        }
        if(authorized){
            var countryId = 0;
            var currencyId = 0;
            var cityId = 0;
            var localityId = 0;
            let countryExists = false;
            var data = {};

            if('country' in propertyRecord && 'city' in propertyRecord && 'location' in propertyRecord && 'pin' in propertyRecord){
                countryExists =  await getExists("country","country_name",propertyRecord.country)
                console.log(countryExists)
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
                
                
                let localityExists =  await getExists("locality","location_name",propertyRecord.location)
                if(!localityExists){

                    let data = {"city_id" : cityId, "location_name": propertyRecord.location, "location_pin": propertyRecord.pin}
                    let insertVal = await insertOne("locality",data)
                    if(insertVal === "false") throw Error("Error in Adding Country")
                    else localityId = insertVal
                    
                }else{
                    localityId = localityExists
                }
                data["location_id"] = localityId
            }
            check_currency = 'currency' in propertyRecord;
            check_price = 'price' in propertyRecord;
            if(check_currency && check_price){
                data['price'] = propertyRecord.price;
                let currencyExists =  await getExists("currency","currency_name",propertyRecord.currency)
                if(!currencyExists){
                    let data = {"currency_name" : propertyRecord.currency}
                    let insertVal =  await insertOne("currency",data)
                    if(insertVal === "false") throw Error("Error in Adding Country")
                    else currencyId = insertVal
                }else{
                    currencyId = currencyExists
                }
                data['currency_id'] = currencyId
            }

            check_length = 'length' in propertyRecord;
            check_breadth = 'breadth' in propertyRecord;
            if(check_length && check_breadth){
                data["length"] = propertyRecord.length;
                data["breadth"] = propertyRecord.breadth;
                data["area"] = parseInt(propertyRecord.length, 10)*parseInt(propertyRecord.breadth, 10);
            }
            else if(check_length && !check_breadth){
                throw Error("Enter both length and breadth")
            }
            else if(check_breadth && !check_length){
                throw Error("Enter both length and breadth")
            }

            check = 'description' in propertyRecord;
            if(check){
                data['description'] = propertyRecord.description;
            } 
            console.log(data);
            const query = "Update property SET " + Object.keys(data).map(key => `${key} = ?`).join(", ") + " WHERE property_id = ?"
            console.log(query);
            const parameters = [...Object.values(data),propertyRecord.property_id];
            console.log(parameters)
            await con.query(query,parameters,(err,result)=>{
                console.log(JSON.stringify(err))
                if(result === undefined){
                    reject("Error in updating")
                }else{
                     resolve("Record Updated")
                }
            })
        }else{
            resolve("Not Authorised")
        }
    })
    return val.then((res)=>{
        return res;
    }).catch((err) => {
        return err;
    })
}


deleteRecord = async (req) => {
    return new Promise(async (resolve,reject)=>{
        let token = req.get("authorization");
        var decoded = jwt_decode(token);
        propertyRecord = req.body
        userId = decoded.user_id;
        let authorized = false
        console.log("propertyRecord"+JSON.stringify(propertyRecord))
        propUserId = await getPropertyById(propertyRecord.property_id)
        if(userId == propUserId){
            authorized = true;
        }
        else{
            reject( "User not authorised to delete")
        }
        if(authorized){
            await con.query('DELETE FROM property WHERE property_id = ?',propertyRecord.property_id,(err,result)=>{
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


exports.search= async (req) => {
    var city = req.query.city ;
    var pin = req.query.pincode ;
    var location = req.query.location;
    var areaup = req.query.areaup;
    var areadown = req.query.areadown;
    var pricedown = req.query.pricedown;
    var priceup = req.query.priceup;
    var data =[]
    return new Promise(async (resolve,reject) => {
        let sql = 'SELECT * FROM property '
        console.log(city)
        if(city !== undefined){
            sql+='WHERE location_id in (SELECT location_id FROM locality WHERE city_id in (SELECT city_id FROM city WHERE city_name = (?)))'
            data.push(city);
        }else if(pin !== undefined){
            sql+='WHERE location_id in (SELECT location_id FROM locality WHERE location_pin = (?)) '
            data.push(pin);
        }else{
            sql+='WHERE location_id in (SELECT location_id FROM locality WHERE location_name = (?)) '
            data.push(location) ;
        }
        if(areadown !== undefined && areaup !== undefined){
            sql+= 'AND area >= ? AND area < ?'
            data.push(areaup);
            data.push(areadown);
        }else if(areadown == undefined && areaup !== undefined){
            sql += 'AND area > ?'
            data.push(areaup);
        }else if(areadown !== undefined && areaup == undefined){
            sql += 'AND area <= ?'
            data.push(areadown);
        }
        if(pricedown !== undefined && priceup !== undefined){
            sql+= 'AND price >= ? AND price < ?'
            data.push(priceup);
            data.push(pricedown);
        }else if(pricedown == undefined && priceup !== undefined){
            sql += 'AND price > ?'
            data.push(priceup);
        }else if(pricedown !== undefined && priceup == undefined){
            sql += 'AND price <= ?'
            data.push(pricedown);
        }
        await con.query(sql,data,(err,result)=>{
            console.log(err)
            if(result !== undefined &&result.length != 0) resolve(result)
            else reject('No properties in your city')
        })
    })
}


exports.con = con;
exports.retriveData = getAllData;
exports.insertRecord = insertRecord
exports.deleteRecord = deleteRecord
exports.recommended = recommended
exports.updateRecord = updateRecord





