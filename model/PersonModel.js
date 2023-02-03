const mongoose = require("mongoose");
const schema = mongoose.Schema;

const PersonSchema = new schema({
    name:{
        type:String,
        required:true
    },
    surName:{
        type:String,
        required: true
    },
    slug:{
        type:String,
        required: true,
        unique:true
    },
    personType:Number,
    gender:Number,
    birthday:Date,
    bio:String,
    cover: String,
    isDeleted:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("Person",PersonSchema)