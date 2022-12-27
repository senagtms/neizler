const jwt = require('jsonwebtoken');
const bcrypt  = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { generateSlugTitle } = require('../helpers/functions');
require('dotenv').config()
const {tokenName} = require('../utils/statics');
const secretKey = process.env.secret_key;

class AuthTools{

    static generateUserName(data){
        return  (generateSlugTitle(data) + '-' + uuidv4().toString().substring(0,4)).toLowerCase()
    }

    static createPasswordHash(password){
        return bcrypt.hash(password,10);
    }

    static comparePassword(password,hash){
        return bcrypt.compare(password,hash);
    }

    static generateToken(payload){
        return jwt.sign(payload,secretKey);
    }

    static verifyToken(token){
        return jwt.verify(token,secretKey);
    }

    static logOutProcess(res){
        res.clearCookie(tokenName);
        res.redirect(res.locals.myUrl + '/auth')
    }

    static checkPerm(need,current=[]){
        return current.includes(need);
    }
}

module.exports = AuthTools;