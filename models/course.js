const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
    title:String,
    desc:String,
    wistaId:String,
    price:Number,
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    purchased:[{
        user:{
           type:Schema.Types.ObjectId,
           ref:'User' 
        }
    }],
    totalStudents:Number
});

module.exports = mongose.model('Course',CourseSchema);