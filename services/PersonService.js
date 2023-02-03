const PersonModel = require("../model/PersonModel");
const BaseService = require("./BaseService");
const mongoose = require("mongoose");

class PersonService extends BaseService{
    constructor() {
        super(PersonModel);
    }

    findWithLimit(limit,last_id=null){
        if(last_id){
            return this.model.find({
                $and:[
                    {isDeleted:false},
                    {_id: {$lt:mongoose.Types.ObjectId(last_id)}}
                ]
            })
            .sort({_id:-1})
            .limit(limit);
            
        }
        return this.model.find({isDeleted:false}).sort({_id:-1}).limit(limit);
    }
    
}

module.exports = PersonService;