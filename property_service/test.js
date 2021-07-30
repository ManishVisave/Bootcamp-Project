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

// const mysql = require('mysql')
// var fetch = require("node-fetch");
// var axios = require('axios');


// var con = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
//     database: process.env.DB_DATABASE
// });

// con.connect((err) => {
//     if (err) throw err;
//     console.log("Connected!");
// });

// exports.search= async (req) => {
    
//     var city = req.query.city ;
//     var pin = req.query.pincode ;
//     var location = req.query.location;
//     var areaup = req.query.areaup;
//     var areadown = req.query.areadown;
//     var pricedown = req.query.pricedown;
//     var priceup = req.query.priceup;
    
//     var data =[]
//     return new Promise(async (resolve,reject) => {
//         let sql = 'SELECT * FROM property '
//         console.log(city)
//         if(city !== undefined){
//             sql+='WHERE location_id in (SELECT location_id FROM locality WHERE city_id in (SELECT city_id FROM city WHERE city_name = (?)))'
//             data.push(city);
            

//         }else if(pin !== undefined){
//             sql+='WHERE location_id in (SELECT location_id FROM locality WHERE location_pin = (?)) '
//             data.push(pin);
//         }else{
//             sql+='WHERE location_id in (SELECT location_id FROM locality WHERE location_name = (?)) '
//             data.push(location) ;

//         }

//         if(areadown !== undefined && areaup !== undefined){
//             sql+= 'AND area >= ? AND area < ?'
//             data.push(areaup);
//             data.push(areadown);

//         }else if(areadown == undefined && areaup !== undefined){
//             sql += 'AND area > ?'
//             data.push(areaup);
//         }else if(areadown !== undefined && areaup == undefined){
//             sql += 'AND area <= ?'
//             data.push(areadown);
//         }

//         if(pricedown !== undefined && priceup !== undefined){
//             sql+= 'AND price >= ? AND price < ?'
//             data.push(priceup);
//             data.push(pricedown);

//         }else if(pricedown == undefined && priceup !== undefined){
//             sql += 'AND price > ?'
//             data.push(priceup);
//         }else if(pricedown !== undefined && priceup == undefined){
//             sql += 'AND price <= ?'
//             data.push(pricedown);
//         }

//         await con.query(sql,data,(err,result)=>{
//             console.log(err)
//             if(result !== undefined &&result.length != 0) resolve(result)
//             else reject("No properties in your city")
//         })
//     })
// }

//  exports.currencyExchange = async(from,to) =>{
//     let val = new Promise(async (resolve,reject)=>{
//         endpoint = 'convert';
//         api_key = process.env.CURRENCY_API_KEY;
//         from = 'EUR';
//         to = 'GBP';
//         amount = '10'
	
// 	//url = "https://www.amdoren.com/api/currency.php?api_key="+api_key+"&from="+from+"&to="+to;
//     // url = "https://www.amdoren.com/api/currency.php?api_key=8YXiPg7pJdaLcnGjAVcNKyxQ2cy8B3&from=INR&to=USD"

//     url =  'https://data.fixer.io/api/' + endpoint + '?access_key=' + access_key +'&from=' + from + '&to=' + to + '&amount=' + amount
//     let res = await axios.get(url);

//     let data = res.data;
//     console.log(data);
//     if(data.error == 0){
//         resolve(data.amount)
//     }
//     else{
//         reject(data.message)
//     }
        
//     })
//     return val.then((res)=>{
//         return res;
//     }).catch((err) => {
//         return err;
//     })
    


//  }

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
    var countryId = 0;
    var currencyId = 0;
    var cityId = 0;
    var localityId = 0;
    var propertyId = 0;
    let countryExists = false;
    var measurement_unit = req.body.measurement_unit;
    var length_any = req.body.length;
    var breadth_any = req.body.breadth;
    propertyRecord = req.body;
    countryExists =  await getExists("country","country_name",propertyRecord.country)

    if(!countryExists){
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
        if(insertVal === "false") 
        return 'Error in Adding City';
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
    if(measurement_unit == 'cm'){
        length_any = length_any/100;
        breadth_any = breadth_any/100;
    }else if(measurement_unit == 'ft'){
        length_any = length_any*0.3048;
        breadth_any = breadth_any*0.3048;
    }else if (measurement_unit =='inch'){
        length_any=length_any*0.0254;
        breadth_any=breadth_any*0.0254;
    }

    data = {
        "location_id":localityId,
        "address":propertyRecord.address,
        "currency_id":currencyId,
        "length":length_any,
        "breadth":breadth_any,
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
                    let photoploaded = await insertOne("photo",data)
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