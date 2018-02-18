    const mongoose = require('mongoose');
    const Schema =  mongoose.Schema;
    const questionSchema= new Schema({
        name:String,
        week:Number,
        year:Number,
        section:String,
        question:String,
        input:Array,
        output:Array,
        postedBy:String
    });

    module.exports  =  mongoose.model('question',questionSchema,'questions');