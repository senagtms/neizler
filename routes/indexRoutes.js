const express = require('express');
const route = express.Router();
const HomeController = require('../controllers/HomeController');
const authMid = require('../middlewares/authMiddleware');

route.get('/',HomeController.index);
route.get('/posts',authMid(),HomeController.userPosts);

module.exports = route;