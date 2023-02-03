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
const fs = require("fs");
const FileManager = require('../managers/FileManager');

class MovieController{
    async save(req,res,next){
        try{
            if(!req.file?.filename || req.fileError){
                return res.json(Response.error(req.fileError));
            }


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
            const list = await Movie.joinedList().limit(2);
            res.render("moviePages/movieList",{url:req.myUrl, list})

        }catch (e) {
            next(e);
        }
    }
    async listMore(req,res,next){
        try {
            const last_id = req.params.id;
            const list = await Movie.joinedList(last_id).limit(1);
            res.json(Response.accept(list));

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
            console.log(selectedActorsList)
            
            res.render("moviePages/updateMovie",{findMovie, selectedCategoryList, directors,selectedActorsList})
          

        }catch(e) {
            next(e)
        }
    }
    async updateMovie(req,res,next){
        try{
            const id = req.params.id

            const movie = await Movie.findById(id)
            
            if(req.fileError){
                return res.json(Response.error(req.fileError));
            }
            const data  = {
                ...req.body,
                categories:req.body.categories.split(','),
                actors:req.body.actors.split(',')
            }

            delete data.cover;
            if(req.file?.filename && req.file.filename !== undefined){
                console.log('new cover =>  ',req.file.filename )
                data.cover = req.file.filename
                if(movie.cover){
                    FileManager.deleteFile(movie.cover)
                }
               
                
            }
            const result = await Movie.updateOne({_id:id},data);
            if(!result){
                return res.json(Response.error('Film Bilgileri Güncellenemedi'))
            }
            res.json(Response.accept());
              
        }catch (e) {
            next(e)
        }
    }
    async deleteMovie(req,res,next){
        try {
            const id = req.params.id;
            const movie = await Movie.findById(id);

            const deleteMovie_ = await Movie.deleteOne({_id:id});
            if(!deleteMovie_){
                res.json(Response.error('Film silinemedi'));
                return;
            }
            if(movie.cover){
                FileManager.deleteFile(movie.cover);
            } 
            res.json(Response.accept());
                   

        } catch (error) {
            next(error)
        }
    }

}

module.exports = new MovieController();