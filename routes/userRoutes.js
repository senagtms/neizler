const express = require('express');
const route = express.Router();
const UserController = require('../controllers/UserController');
const authMid = require('../middlewares/authMiddleware');


route.get('/profile/:userName',authMid(),UserController.profileDetail);
route.get('/profile',authMid(),UserController.userProfile);
route.post('/blockUser',authMid(),UserController.userBan);


module.exports = route;