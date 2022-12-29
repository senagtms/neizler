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
            if(!req.file?.filename || req.fileError){
                return res.json(Response.error(req.fileError));
            }
            console.log('resim => ',req.file.filename);
            console.log('body => ',req.body.categories.split(','));


            const data = {
                ...req.body,
                gender:req.body.gender,
                slugTitle: generateSlugTitle(req.body.title),
                categories:req.body.categories.split(','),
                actors:req.body.actors.split(','),
                cover:req.file.filename 
            }
            const movie = await Movie.saveToDb(data);
            if(!movie){
                return res.json(Response.error('Movie Not Created'));
            }
            res.json(Response.accept(movie));
           
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
            res.render('moviePages/createMovie',{url:req.myUrl, categoryList, directors,actors});
        }
        catch (e) {
            next(e);
        }
    }
    async list(req,res,next){
        try {
            const list = await Movie.joinedList();
            res.render("moviePages/movieList",{url:req.myUrl, list})

        }catch (e) {
            next(e);
        }
    }
    async movieUpdatePage(req,res,next){
        try{
            const movie = req.params.id

            const findMovie = await Movie.findOne({_id:movie});
            const categoryList = await Category.find({    }, 'title');
            const person = await Person.find({},'name surName personType');
            const directors = person.filter(item => item.personType === personType.DIRECTOR );
            const actors = person.filter(item => item.personType === personType.ACTOR);
            const selectedCategoryList = categoryList.map(item=>{
                return {
                    ...item.toObject(),
                    isChecked: findMovie.categories.includes(item._id)

                }
            })
            const selectedActorsList = actors.map(item => {
                return {
                    ...item.toObject(),
                    isChecked: findMovie.actors.includes(item._id)
                }
            });
            console.log('selected => ',selectedActorsList);
            res.render("moviePages/updateMovie",{findMovie, selectedCategoryList, directors,selectedActorsList})
          

        }catch(e) {
            next(e)
        }
    }
    async updateMovie(req,res,next){
        try{
            
        }catch (e) {
            
        }
    }

}

module.exports = new MovieController();