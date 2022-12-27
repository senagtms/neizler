const userService = require("../services/UserService")
const UserService  = new userService();
const blockUserService = require('../services/BlockUserService');
const BlockUserService = new blockUserService();
class HomeController{
    async index(req,res,next){
        try{
            const users  = await UserService.find({    }, 'name userName email')
            res.render("home",{userList:users})
        }catch (e) {
            next(e)
        }
    }



    async userPosts(req,res,next){
        try {
            const blockedList = await BlockUserService.getBlockList(req.userData._id);
            const users  = await UserService.find({_id:{$nin:blockedList}}, 'name userName email');
            res.render('home',{userList:users});
        }catch (e) {
            next(e);
        }
    }



}

module.exports = new HomeController();