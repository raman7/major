const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const facultySchema= new Schema({
    username:String,
    password:String,
    map:[
        
    ]
});

module.exports  =  mongoose.model('faculty',facultySchema,'faculties');