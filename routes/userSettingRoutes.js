const express = require('express');
const route = express.Router();
const SettingController = require('../controllers/SettingController');
const authMid = require("../middlewares/authMiddleware");
const UserController = require("../controllers/UserController");

route.get('/changePassword',SettingController.changePassword);

route.get('/',SettingController.userSecuritySetting);
route.get('/userInfo',SettingController.userInfoSetting);
route.patch('/userName',SettingController.updateUserNickName);
route.patch('/userInfo',SettingController.updateUserInfo)
route.get('/blockUsers',SettingController.blockList);
route.get('/password',SettingController.updatePassword);
route.patch('/password',SettingController.updatePasswordProcess);
route.delete('/unBlockUser/:id',authMid(),SettingController.unBlockUser);
module.exports = route;