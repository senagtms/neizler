const PersonModel = require("../model/PersonModel");
const BaseService = require("./BaseService");

class PersonService extends BaseService{
    constructor() {
        super(PersonModel);
    }
}

module.exports = PersonService;