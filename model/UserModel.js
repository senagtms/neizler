const mongoose = require('mongoose');
const schema = mongoose.Schema;


const userSchema = new schema({
     name:{
         type:String,
         required:[true,'Kullanıcı İsmi Zorunludur'],
         trim:true
     },
     password:{
         type:String,
         required:[true,'Şifre Alanı Zorunlu'],
     },
    userName:{
         type:String,
        unique: true,
        required:true
    },
    email:{
         type:String,
        required:true,
        unique:true,
        trim:true
    },
    isSuspend:{
         type:Boolean,
         default:false
    },
    gender:{
         type:Number,
         max:2
    },
    birthDay: Date,
    perms:{
         type:[String],
        default:['user']
    },
       audit:{
             createdAt:{
                 type:Date,
                 default:Date.now
             },
           updatedAt:String
       }
});

module.exports = mongoose.model('user',userSchema);