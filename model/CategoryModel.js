const mongoose = require("mongoose");
const schema = mongoose.Schema;

const CategorySchema = new schema({
    title:{
        type:String,
        required:true
    },
    slugTitle:{
        type:String,
        required: true,
        unique:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("Category",CategorySchema);