const userService = require('../services/UserService');
const UserService = new userService();
const ResponseManager = require('../managers/ResponseManager');
const Response = new ResponseManager();
const blockUserService = require('../services/BlockUserService');
const BlockUserService = new blockUserService();
class UserController{
    userProfile(req,res,next){
        try{
            res.render("userProfile",{url:req.myUrl, userData:req.userData})
        }catch (e){
            next(e);
        }
    }
    async profileDetail(req,res,next){
        try {
            const userName = req.params.userName;
            const userDetail = await UserService.findOne({userName,isSuspend:false});
            const checkBan = await BlockUserService.isBlockedBetween(req.userData._id,userDetail._id);
            if(!userDetail || checkBan){
                return res.render('404');
            }
            res.render('otherProfile',{userDetail});
        }catch (e) {
            next(e);
        }
    }
    userBan(req,res,next){
        const bannedId = req.body.id;
        if(req.userData._id === req.body.id){
            return res.json(Response.error('Connection Refused'));
        }
        const data = {
            bannedId,
            bannedVia:req.userData._id
        }
        BlockUserService.saveToDb(data)
            .then(result => {
                res.json(Response.accept());
            })
            .catch(e => next(e))
    }

}

module.exports = new UserController();