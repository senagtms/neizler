const CommandModel = require("../model/CommentModel");
const BaseService = require("./BaseService");

class CommandService extends BaseService{
    constructor() {
        super(CommandModel);
    }
}

module.exports = CommandService;