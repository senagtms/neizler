const AuthTools = require('../utils/AuthTools')
const userService = require('../services/UserService');
const {tokenName} = require('../utils/statics');
const {userPermType} = require('../utils/types');
const UserService = new userService();
module.exports = (perm = userPermType.user) => {
    return async (req,res,next) => {
        try {
            const token = req.cookies[tokenName] || null;
            if(!token){
                return res.status(401).redirect(res.locals.myUrl + '/auth');
            }
            const decoded = AuthTools.verifyToken(token)
            if(!decoded){
                return res.status(401).redirect(res.locals.myUrl + '/auth');
            }
            const user = await UserService.findById(decoded.userId);
            if(!user || user.isSuspend){
                return AuthTools.logOutProcess(res);
            }
            if(!AuthTools.checkPerm(perm,user.perms)){
                return AuthTools.logOutProcess(res);
            }
            req.userData = user.toObject();
            res.locals.name = req.userData.name;
            next();
        }catch (e) {
            return res.status(401).redirect(res.locals.myUrl + '/auth');
        }
    }
}