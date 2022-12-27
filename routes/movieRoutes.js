const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/MovieController');
const AuthMid = require('../middlewares/authMiddleware');


router.get('/',MovieController.list);
module.exports = router;