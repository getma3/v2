const mongoose = require("mongoose");
const ejs = require("ejs");
const express = require("express");
const bodyparser = require("body-parser");
const urlencodedparser = bodyparser.urlencoded({extended:false});
const keys = require("./config/keys");
const port = process.env.port || 3000;
const app = express();
const passport = require("passport");
const passportSetup = require('./config/passport-setup');
const cookieSession =require("cookie-session");


// Routes
const API_routes = require("./routes/api_routes");
const TEAM_routes = require("./routes/team_routes");
const AUTH_routes = require("./routes/auth_routes");

mongoose.connect(`mongodb://${keys.db.dbuser}:${keys.db.dbpass}@ds259111.mlab.com:59111/getma3`);
mongoose.connection.once("open",()=>{
    console.log("connection to db successful");
}).on("error",(err)=>{
    console.log("failed to connect to db",err);
})
app.use(cookieSession({
    maxAge:3*60*60*1000,
    keys:[keys.session.key]
}));
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine","ejs");
app.use('/assets',express.static('assets'));

// Routing 
app.use('/api',API_routes);
app.use('/team',TEAM_routes);
app.use('/auth',AUTH_routes);


app.get('/',(req,res)=>{
    res.send("hello world, welcome home!");
})

app.listen(port,()=>{
    console.log(`listening to requests on port ${port}`);
})
