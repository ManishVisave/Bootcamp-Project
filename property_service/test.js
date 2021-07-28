const mysql = require('mysql')
var fetch = require("node-fetch");
var axios = require('axios');


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
            else reject("No properties in your city")
        })
    })
}

 exports.currencyExchange = async(from,to) =>{
    let val = new Promise(async (resolve,reject)=>{

        api_key = process.env.CURRENCY_API_KEY;
	
	
	url = "https://www.amdoren.com/api/currency.php?api_key="+api_key+"&from="+from+"&to="+to;
    // url = "https://www.amdoren.com/api/currency.php?api_key=8YXiPg7pJdaLcnGjAVcNKyxQ2cy8B3&from=INR&to=USD"
    let res = await axios.get(url);

    let data = res.data;
    console.log(data);
    if(data.error == 0){
        resolve(data.amount)
    }
    else{
        reject(data.message)
    }
        
    })
    return val.then((res)=>{
        return res;
    }).catch((err) => {
        return err;
    })
    


 }
