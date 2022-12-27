const MovieService = require('../services/MovieService');
const Movie = new MovieService();
const CategorySevice = require('../services/CategoryService');
const Category  = new CategorySevice();
const PersonService = require('../services/PersonService');
const Person = new PersonService();
const ResponseManager = require('../managers/ResponseManager');
const {generateSlugTitle} = require("../helpers/functions");
const Response = new ResponseManager();
const {personType} = require('../utils/types');

class MovieController{
    async save(req,res,next){
        try{
/*            const data = {
                ...req.body,
                gender:req.body.gender,
                slugTitle: generateSlugTitle(req.body.title)
            }
            const movie = await Movie.saveToDb(data);
            if(!movie){
                return res.json(Response.error('Movie Not Created'));
            }
            res.json(Response.accept(movie));*/
            if(!req.file?.filename || req.fileError){
                return res.json(Response.error(req.fileError));
            }
            console.log('resim => ',req.file.filename);
            console.log('body => ',req.body.categories.split(','));
            res.json({success:true});
        }catch (e) {
            next(e);
        }
    }
    async createMoviePage(req,res,next){
        try {
            const categoryList = await Category.find({    }, 'title');
            const person = await Person.find({},'name surName personType');
            const directors = person.filter(item => item.personType === personType.DIRECTOR );
            const actors = person.filter(item => item.personType === personType.ACTOR);
            res.render('moviePages/CreateMovie',{url:req.myUrl, categoryList, directors,actors});
        }
        catch (e) {
            next(e);
        }
    }
    async list(req,res,next){
        try {
            const list = await Movie.joinedList();
            return res.json(Response.accept(list));
        }catch (e) {
            next(e);
        }
    }

}

module.exports = new MovieController();