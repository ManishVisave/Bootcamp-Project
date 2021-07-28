const express = require('express')
const db = require('./db.js')
var multipart = require('connect-multiparty');
var uploader = require('./testUpload.js')
var multipartMiddleware = multipart();

var app = express()

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

app.post("/add",multipartMiddleware,async (req,res)=>{
  let array = []

  for(let i = 0; i < req.files.file.length; i++){
    array.push(await uploader.upload(req.files.file[i]))
  }

  if(array.length != 0) req.body.files = array
  // console.log("Array: "+array.length)
  await db.insertRecord(req.body).then(result => {
    res.json('Record added')
  }).catch(err=>console.log(err))
})

app.post("/update",async (req,res)=>{
  console.log(req.body)
  await db.updateRecord(req.body).then(result => {
    res.json('Record updated')
  }).catch(err=>console.log(err))
})

app.get('/recommend',async (req,res) =>{
  await db.recommended(req.body.user_city).then(result =>{
    res.json(result)
  }).catch(err=>res.json(err))
  window.addEventListener("unhandledrejection", event => {
    console.log(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
  });
})

app.get("/getAll",async (req,res)=>{
  await db.retriveData().then(result => {
    res.json(result)
  }).catch(err => console.log(err))
})

app.delete('/delete', async (req,res) => {
  await db.deleteRecord(req.query.propertyId,req.query.userId).then(result => {
    res.json(result)
  }).catch(err => res.json(err))
})

app.listen(8888,(req,res)=>{
  console.log("Server is Listening on Port 8888")
})
