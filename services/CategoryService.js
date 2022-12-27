const CategoryModel = require("../model/CategoryModel");
const BaseService = require("../services/BaseService");

class CategoryService extends BaseService{
    constructor() {
        super(CategoryModel);
    }
}

module.exports = CategoryService;