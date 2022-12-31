const personService = require('../services/PersonService');
const PersonService = new personService();
const ResponseManager = require('../managers/ResponseManager');
const {generateSlugTitle} = require("../helpers/functions");
const {genders} = require("../utils/types");

const Response = new ResponseManager();

class PersonController{
    async save(req,res,next){
        try{
            const { name,surName,gender,personType } = req.body;
            const person = await PersonService.saveToDb({
                name,surName,gender,personType,slug: generateSlugTitle(name + '-'+surName)
            });
            if(!person){
                return res.json(Response.error('Person Not Created'));
            }
            return  res.json(Response.accept(person));
        }catch (e) {
            next(e)
        }
    }

    async list(req,res,next){
        try{

            const personData  = await PersonService.findWithLimit({},2)
            res.render("moviePages/personList",{url:req.myUrl, personData})
        }catch (e) {
            next(e)
        }
    }
    async listMorePerson(req,res,next){
        try{
            const lastId = req.params.id;

        }catch (e) {
            next(e);
        }
    }

    maleList(req,res,next){
        PersonService.find({gender:genders.MALE})
            .then(list => {
                res.json(Response.accept(list));
            })
            .catch(e => next(e))
    }
}
module.exports= new PersonController()