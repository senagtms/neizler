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
            const listCategory = await Category.find({isDeleted:false},'_id title');
            res.render("moviePages/categoryList",{url:req.myUrl, categoryData:listCategory})

        }catch (e) {
            next(e)

        }
    }
    async updateGetPage(req,res,next){
        try {
             const id = req.params.id;
             const categoryList = await Category.findOne({_id:id});
             res.render("moviePages/updateCategory",{categoryList})
        } catch (error) {
            next(error);
        }
    }
    async updateCategory(req,res,next){
        try {
            const id = req.params.id
            if(!req.body.title){
                return res.json(Response.error('Kategori Adı Boş Geçilemez'))
            }
            const updateCategory_ = await Category.updateOne({_id:id},req.body);
            if(!updateCategory_){
                return res.json(Response.error('Bilgiler güncellenmedi'))
            }
            return res.json(Response.accept());
        } catch (error) {
            next(error)
        }
    }
    async deleteCategory(req,res,next){
        try {
            const delete_ = await Category.updateisDeleted({_id:req.body._id},{isDeleted:true})
            if(!delete_){
                return res.json(Response.error('Silinemedi'))
            }
            return res.json(Response.accept())
            
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CategoryController();