const {tokenName} = require('../utils/statics');
module.exports = async (req,res,next)=>{
    try{
        const token = req.cookies[tokenName] || null;
        if(token){
            return res.redirect(res.locals.myUrl + '/')
        }
        next()
    }catch (e){
        next(e)
    }

}