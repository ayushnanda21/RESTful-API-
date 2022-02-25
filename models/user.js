const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config =require('../config/config').get(process.env.NODE_ENV);
const salt = 10;



//defining schemas and models

var mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    firstname: {
        type : String,
        required: true,
        maxlength : 100
    },

    lastname: {
        type: String,
        required: true,
        maxlength : 10
    },

    email:{
        type: String,
        required : true,
        trim: true,
        unique: 1
    },

    password: {
        type: String,
        required: true,
        minlength: 8
    },

    password2:{
        type: String,
        required: true,
        minlength: 8
    },

    token: {
        type: String
    }

});


module.exports = mongoose.model("User",userSchema);

//hashing passwords, when new user is save into db, func will be called and password 
userSchema.pre('save',function(next){

    var user = this;

    if(user.isModified('password')){

        bcrypt.genSalt(salt,function(err,salt){
            if(err) return next(err);


            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password = hash;
                user.password2 = hash;
                next();
            })


        })
    }
    else{
        next();
    }

});