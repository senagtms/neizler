const express = require("express")
const CategoryController  = require("../controllers/CategoryController")
const router = express.Router();
const AuthMid = require('../middlewares/authMiddleware')

router.get('/',CategoryController.list)
router.post('/',AuthMid(),CategoryController.save);

module.exports = router;