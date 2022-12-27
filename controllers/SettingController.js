const userService = require('../services/UserService');
const AuthTool = require('../utils/AuthTools');
const blockUserService = require('../services/BlockUserService');
const {isValidUserName,isEmail} = require('../helpers/functions');
const UserService = new userService();
const ResponseManager = require('../managers/ResponseManager');
const moment = require("moment");
const Response = new ResponseManager();
class SettingController{
    changePassword(req,res,next){
        try {
            res.json(Response.accept());
        }catch (e) {
            next(e);
        }
    }
    async userSecuritySetting(req,res,next){
        try{
            res.render("settingViews/setting",{url:req.myUrl, userData:req.userData})
        }catch (e){
            next(e)
        }
    }
    async userInfoSetting(req,res,next){
        try{
            if(req.userData.birthDay) req.userData.birthDay = moment(req.userData.birthDay).format('YYYY-MM-DD');
            res.render("settingViews/userInfoSetting",{url:req.myUrl, userData:req.userData})
        }catch (e){
            next(e)
        }
    }
    async updateUserNickName(req,res,next){
        try {
            const userId = req.userData._id;
            const userName = req.body.userName;
            if(!isValidUserName(userName)){
                return  res.json(Response.error('Geçersiz Kullanıcı adı'));
            }
            if(req.userData.userName === userName){
                return  res.json(Response.error('Kullanıcı adını değiştirmediniz'));
            }
            const checkAnotherUsers = await  UserService.findOne({userName},'_id');
            if(checkAnotherUsers){
                return res.json(Response.error('Bu Kullanıcı Adı Alınmış'));
            }
            const result = await UserService.updateOne({_id:userId},{userName});
            if(!result){
                return  res.json(Response.error('İşlem Gerçekleştirilemedi'));
            }
            res.json(Response.accept());
        }catch (e) {
            next(e);
        }
    }
    async updateUserInfo(req,res,next){
        try {
            const userId = req.userData._id;
            const email = req.body.email
            const name = req.body.name
            const birthDay = req.body.birthDay;
            console.log(birthDay)

            if(!isEmail(email)){
                    return res.json(Response.error("Lütfen bir email giriniz"))
            }
                const checkAnotherEmail = await UserService.findOne({email,_id:{$ne:userId}},'_id')
            if(checkAnotherEmail){
                return res.json(Response.error("Bu email adresi başkasına ait"))
            }

            const result = await UserService.updateOne({_id:userId},{email:email, name:name, birthDay:birthDay});
            if(!result){
                return  res.json(Response.error('Bilgilerinizi Güncellemediniz'));
            }
            res.json(Response.accept());




        }catch (e) {
            next(e)
        }
    }
    async blockList(req,res,next){
        try {
            const BlockUserService = new blockUserService();
            const blockedList = await BlockUserService.getMyBlockList(req.userData._id);
            res.render("settingViews/blockListSetting",{blockedList})
        }catch (e) {
            next(e);
        }
    }
    async unBlockUser(req,res,next){
        try {
            const BlockUserService = new blockUserService();
            const documentId = req.params.id;
            const userId = req.userData._id;
            const cond = {
                _id:documentId,
                bannedVia: userId
            };
            const result = await BlockUserService.deleteOne(cond);
            if(!result){
                return res.json(Response.error('Connection Refused'));
            }
            res.json(Response.accept());
        }catch (e) {
            next(e);
        }
    }
    async updatePassword(req,res,next){
        try {
            res.render('settingViews/passwordSetting');
        }catch (e) {
            next(e);
        }
    }
    async updatePasswordProcess(req,res,next){
        try {
            const {password,rePassword,currentPassword} = req.body;
            if(password.length<6 || password.length>32 || rePassword.length<6 || rePassword.length>32){
                return res.json(Response.error('Şifre En Az 6 En Fazla 32 Karakter Olmalıdır'));
            }
            if(password !== rePassword){
                return res.json(Response.error('Girilen Şifreler Eşleşmiyor'));
            }
            const user = await UserService.findOne({_id:req.userData._id},{password:1});
            if(!user){
                return res.json(Response.error('Bad Request'));
            }
            if(!(await AuthTool.comparePassword(currentPassword,user.password))){
                return res.json(Response.error('Geçerli Şifre Hatalı'));
            }
            if(password === currentPassword){
                return res.json(Response.error('Yeni Şifreniz Eskisi İle Aynı'));
            }
            const hashNewPassword = await AuthTool.createPasswordHash(password);
            const result = await UserService.updateOne({_id:req.userData._id},{password:hashNewPassword});
            if(!result){
                return res.json(Response.error('Şifre Güncellenirken Bir Hata Oluştu'));
            }
            res.json(Response.accept());
        }catch (e) {
            next(e);
        }
    }
}

module.exports = new SettingController();