const PersonModel = require("../model/PersonModel");
const BaseService = require("./BaseService");
const mongoose = require("mongoose");

class PersonService extends BaseService{
    constructor() {
        super(PersonModel);
    }

    findWithLimit(cond,limit){
        return this.model.find({_id: {$lt:mongoose.Types.ObjectId()}}).limit(limit)
    }
}

module.exports = PersonService;