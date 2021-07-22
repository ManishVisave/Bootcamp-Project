const express = require('express')
const db = require('./db.js')

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

app.post("/add",async (req,res)=>{
  // console.log(req.body)
  await db.insertRecord(req.body).then(result => {
    res.json('Record added')
  }).catch(err=>console.log(err))
})

app.get("/getAll",async (req,res)=>{
  await db.retriveData().then(result => {
    res.json(result)
  }).catch(err => console.log(err))
})

app.delete('/delete/:propertyid', async (req,res) => {
  await db.deleteRecord(req.params.propertyid).then(result => {
    res.json(result)
  }).catch(err => console.log(err))
})

app.listen(8888,(req,res)=>{
  console.log("Server is Listening on Port 8888")
})
