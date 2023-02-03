const PersonController = require('../controllers/PersonController');
const express = require('express');
const router  = express.Router();

router.post('/',PersonController.save);
router.get('/',PersonController.list);


module.exports = router;