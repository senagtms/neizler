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
            const personData  = await PersonService.findWithLimit(1)
            res.render("moviePages/personList",{url:req.myUrl, personData})
        }catch (e) {
            next(e)
        }
    }
    async listMorePerson(req,res,next){
        try{
            const lastId = req.params.id;
            const list = await PersonService.findWithLimit(1,lastId);
            res.json(Response.accept(list));

        }catch (e) {
            next(e);
        }
    }
    async personUpdateGetPage(req,res,next){
        try{
            const id = req.params.id;
            const list = await PersonService.findById(id);
            const personData = {
                ...list.toObject(),
                checked:true
            }
            res.render("moviePages/updatePerson",{personData});


        }catch(e){
            next(e);
        }
    }
    async updatePerson(req,res,next){
        try {
            const id = req.params.id;
    
            if(!req.body.name || !req.body.surName){
                return res.json(Response.error('Zorunlu boş bırakamazsız'));
            }
            if(req.body.name.length<3 || req.body.surName.length<3){
                return res.json(Response.error('isim ve soyisim en az 3 karakter'));
            }
            const updatePersonInfo = await PersonService.updateOne({_id:id},req.body);
            if(!updatePersonInfo){
                return res.json(Response.error('Bilgiler Değiştirilemedi'));            
            }
            res.json(Response.accept());

        } catch (error) {
            next(error);
        }
    }
    async deletePerson(req,res,next){
        try {

            const isDeleted = await PersonService.updateisDeleted({_id:req.body._id},{isDeleted:true});
            if(!isDeleted){
                return res.json(Response.error('Kişi silinemedi'))
            }
            return res.json(Response.accept());
            
        } catch (error) {
            next(error);
        }
    }

}
module.exports= new PersonController()