const express = require('express')
const db = require('./db.js')
var multipart = require('connect-multiparty');
var uploader = require('./testUpload.js')
var multipartMiddleware = multipart();
var app = express()


const{ checkToken } = require("./auth/token_validation");
bodyParser = require('body-parser');
app.set('json spaces', 40)
app.use(bodyParser.urlencoded({
  extended: true
}));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());


app.get("/",(req,res)=>{
  res.send("Server Listening.....")
})

app.post("/add",multipartMiddleware,checkToken,async (req,res)=>{
  let array = []
  console.log(req.files)
  if(req.files !== undefined){
  for(let i = 0; i < req.files.file.length; i++){
    console.log(req.files.file[i])
    let val =await uploader.upload(req.files.file[i])
    array.push(val)
  }
}

  req.body.files = array
  // console.log("Array: "+array.length)
  await db.insertRecord(req).then(result => {
    //res.json(result)
    res.json({
      status :true ,
      data:result
    })
  }).catch(err=>console.log(err))
})
app.post("/update",checkToken ,async (req,res)=>{
  
  await db.updateRecord(req).then(result => {
    //res.json(result)
    res.json({
      status : true ,
      data :result
    })
    
  }).catch(err=>res.json({
      status :false,
      message :err
  }))
})

app.get('/recommend',checkToken,async (req,res) =>{
  console.log(req)
  await db.recommended(req).then(result =>{
    //res.json(result)
    res.json({
      data:result,
      status : true 
    })
  }).catch(err=>res.json({
    status :false,
    message :err
}))
  /*window.addEventListener("unhandledrejection", event => {
    console.log(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
  });*/
})

app.get("/getAll",async (req,res)=>{
  await db.retriveData().then(result => {
    //res.json(result)
    res.json({
      status : true ,
      data : result
    })
  }).catch(err=>res.json({
    status :false,
    message :err
}))
})

app.delete('/delete', checkToken ,async (req,res) => {
  await db.deleteRecord(req).then(result => {
    //res.json(result)
    res.json({
      status : true ,
      data : result
    })
  }).catch(err=>res.json({
    status :false,
    message :err
}))
})

app.get('/search',async (req ,res) => {
  console.log(req.query)
  
  await db.search(req).then(result => {
    //res.json(result)
    res.json({
      status : true ,
      data:result
    })
  }).catch(err=>res.json({
    status :false,
    message :err
}))
})

app.get('/convert' , async(req ,res) => {
  //console.log(req.query)
  await find.currency_convert().then(result => {
    //res.json(result)
    res.json({
      status : true ,
      data : result
    })
  }).catch(err=>res.json({
    status :false,
    message :err
}))
})

app.listen(8888,(req,res)=>{
  console.log("Server is Listening on Port 8888")
})
