const BaseService = require('./BaseService');
const userModel = require('../model/UserModel');

class UserService extends BaseService{
    constructor() {
        super(userModel);
    }

}

module.exports = UserService;