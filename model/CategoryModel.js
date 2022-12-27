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
    }
})

module.exports = mongoose.model("Category",CategorySchema);