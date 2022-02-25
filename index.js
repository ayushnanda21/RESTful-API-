// basic code, routes and imported dependency
//acquiring all modules

const express  =  require('express');
const mongoose =  require('mongoose');
const bodyparser = require('body-parser');
const cookieParser  = require('cookie-parser');

//import from config file for db
const db = require('./config/config').get(process.env.NODE_ENV);

const app = express();

//using these modueles through express
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(cookieParser());

// database connection
mongoose.Promise = global.Promise;
mongoose.connect(db.DATABASE,{useNewUrlParser : true, useUnifiedTopology: true},function(err){

    if(!err){
        console.log("Database Connected");
    }else{
        console.log(err);
    }

});

//get route
app.get('/',function(req,res){


    res.status(200).send("Welcome to RESTFUL API");

});

//server port

const PORT = process.env.PORT || 3000;
app.listen(PORT,function(req,res){

    console.log("Server has started on port 3000");
});