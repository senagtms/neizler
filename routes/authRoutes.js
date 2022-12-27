const express = require('express');
const route = express.Router();
const AuthController = require('../controllers/AuthController');
const authControlMid = require("../middlewares/authControlMiddleware")

route.get('/',authControlMid,AuthController.index);
route.post('/', AuthController.loginProcess)
route.get('/register',authControlMid,AuthController.register);
route.post('/register',AuthController.registerProcess);
route.get("/logout", AuthController.logout)
module.exports = route;