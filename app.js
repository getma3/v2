const mongoose = require("mongoose");
const ejs = require("ejs");
const express = require("express");
const bodyparser = require("body-parser");
const urlencodedparser = bodyparser.urlencoded({extended:false});
//
const keys = require("./config/keys");

const port = process.env.port || 3000;

const app = express();

// Routes
const API_routes = require("./routes/api_routes");
const TEAM_routes = require("./routes/team_routes");

mongoose.connect(`mongodb://${keys.db.dbuser}:${keys.db.dbpass}@ds259111.mlab.com:59111/getma3`);

mongoose.connection.once("open",()=>{
    console.log("connection to db successful");
}).on("error",(err)=>{
    console.log("failed to connect to db",err);
})

app.set("view engine","ejs");
app.use('/assets',express.static('assets'));

// Routing 
app.use('/api',API_routes);
app.use('/team',TEAM_routes);


app.get('/',(req,res)=>{
    res.send("hello world, welcome home!");
})

app.listen(port,()=>{
    console.log(`listening to requests on port ${port}`);
})
