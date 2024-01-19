const express = require('express');
 const app = express();
 const userRoute = require('./src/routes/User');
const config = require('./src/config/database');
 const port = 4000;
 const mongoose= require("mongoose");
 const bodyParser = require("body-parser");


 app.use('/api/v1/chat',userRoute)

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
// creating a connection between the controller and database
mongoose.connect(config.database,{
    //useNEW collects data then formats it
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db= mongoose.connection
// checking if db has connected
db.once("open", ()=>{
console.log("connected to db")
})
db.on("error",(err)=>{
console.error(err)
})
 app.listen( port,()=>{
     console.log(`listening to port ${port}`)
 })