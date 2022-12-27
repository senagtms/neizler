const mongoose = require('mongoose');
const schema = mongoose.Schema;


const userBlockSchema = new schema({
    bannedId: schema.Types.ObjectId,
    bannedVia: schema.Types.ObjectId,
    time: {
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('blockUser',userBlockSchema);