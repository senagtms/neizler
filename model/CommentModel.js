const mongoose = require("mongoose");
const schema = mongoose.Schema;

const CommentSchema = new schema({
    userId:{
        type:schema.Types.ObjectId,
        ref:"user"
    },
    movieId:{
        type: schema.Types.ObjectId,
        ref:"Movie"
    },
    command:String,
    date: {
        type: Date,
        default: Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("Comment",CommentSchema);