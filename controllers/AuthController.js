const userService = require('../services/UserService');
const AuthTools = require('../utils/AuthTools');
const { isEmail } = require('../helpers/functions');
const {tokenName} = require('../utils/statics');

const UserService = new userService();
class AuthController{
     async index(req,res,next){
         const message = await req.consumeFlash('error');
         let errorMessage = false;
         if(message.length){
             errorMessage = message[0];
         }
        res.render('login', { title: 'Kübra ', message: 'Hello there!',errorMessage })
    }
    async register(req,res,next){
        const message = await req.consumeFlash('error');
        let errorMessage = false;
        if(message.length){
            errorMessage = message[0];
        }
        res.render('register', { title: 'Kübra ', message: 'Hello there!',errorMessage })
    }

    async registerProcess(req,res,next){
        try{

            const {name,email,password,rePassword,gender} = req.body;

            if(!name && !email && !password && !rePassword && !gender){ 
                await req.flash('error',  'Lütfen Tüm Alanları Doldurun');
                return res.redirect(res.locals.myUrl + '/auth/register')
            }

            if(password !== rePassword ){
                await req.flash('error',  'Şifreler eşleşmiyor, lütfen tekrar kontrol ediniz');
                return res.redirect(res.locals.myUrl + '/auth/register')
            }
            if(password.length<6 || password.length>32){
                await req.flash('error',  'Şifreniz en az 6 en fazla 32 karakterden oluşmalıdır');
                return res.redirect(res.locals.myUrl + '/auth/register')
            }
            if(!isEmail(email)){
                await req.flash('error',  'Lütfen Geçerli Bir Email Adresi Girin');
                return res.redirect(res.locals.myUrl + '/auth/register')
            }
            const data = {
                name:name,
                email,
                password: await AuthTools.createPasswordHash(password),
                gender:parseInt(gender),
                userName:  AuthTools.generateUserName(name)
            }
            const result = await UserService.saveToDb(data);;
            if(!result){
                await req.flash('error',  'Kullanıcı kayıt edilemedi');
                return res.redirect(res.locals.myUrl + '/auth/register')
            }
            return res.redirect(res.locals.myUrl + '/auth')
        }catch (e) {
            next(e);
        }

    }
    async loginProcess(req,res,next){

        try {
            const {email,password} = req.body;
            const user  = await UserService.findOne({email:email})

            if(!user || user.isSuspend){
                await req.flash('error',  'Giriş işlemi başarısız');
                return res.redirect(res.locals.myUrl + '/auth')
            }
            const passwordHash = user.password;

            if(!(await AuthTools.comparePassword(password,passwordHash))){
                await req.flash('error',  'Kullanıcı bilgilerini kontrol ediniz');
                return res.redirect(res.locals.myUrl + '/auth')
            }
            const token = AuthTools.generateToken({userId: user._id.toString()});

            res.cookie(tokenName, token)
            res.redirect(res.locals.myUrl + '/profile')



        }catch (e) {
            next(e)
        }

    }
    async logout(req,res,next){
       AuthTools.logOutProcess(res);
    }
}

module.exports = new AuthController();