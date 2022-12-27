const mongoose = require("mongoose");
const schema = mongoose.Schema;

const MovieSchema = new schema({
    title:{
        type:String,
        required:true
    },
    slugTitle:{
        type:String,
    },
    originalTitle:{
        type:String,
        required: true
    },
    summary:String,
    categories:{
        type:[schema.Types.ObjectId],
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    imdb:{
        type:Number,
        required:true
    },
    director:{
        type:schema.Types.ObjectId,
        required:true
    },
    fragman:String,
    cover:String,
    actors:[schema.Types.ObjectId]


})

module.exports = mongoose.model("Movie",MovieSchema);