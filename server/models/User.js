const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const userSchema= new Schema({
    username:String,
    password:String,
    year:Number,
    section:String,
    marks:Number
});

module.exports  =  mongoose.model('user',userSchema,'users');