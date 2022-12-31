const CategoryService = require("../services/CategoryService");
const ResponseManager = require("../managers/ResponseManager");
const Response  = new ResponseManager();
const Category = new CategoryService();
const {generateSlugTitle} = require('../helpers/functions');
class CategoryController{
    async save(req,res,next){
       try{
           const title = req.body.title;
           const slugTitle = generateSlugTitle(title);
           if(!title){
               res.json(Response.error("Kategori Boş Olamaz"));
               return;
           }
           const data = {
               title,
               slugTitle
           }
           const result = await Category.saveToDb(data);
           if(!result){
               res.json(Response.error("Kategori kayıt edilemedi"));
               return;
           }
           res.json(Response.accept(result))

       }catch (e) {
           next(e)
       }

    }
    async list(req,res,next){
        try{
            const listCategory = await Category.find({},'_id title');
            res.render("moviePages/categoryList",{url:req.myUrl, categoryData:listCategory})

        }catch (e) {
            next(e)

        }
    }
}

module.exports = new CategoryController();