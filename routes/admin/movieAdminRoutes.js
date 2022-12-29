const express = require('express');
const router = express.Router();
const MovieController = require('../../controllers/MovieController');
const CategoryController = require('../../controllers/CategoryController');
const PersonController = require('../../controllers/PersonController');

const upload = require('../../middlewares/fileUpload');



/*movie Endpoints */
router.get('/movie/create',MovieController.createMoviePage);
router.post('/movie/create',upload.single('cover'),MovieController.save);
router.get('/movie/list',MovieController.list)
router.get('/movie/update/:id',MovieController.movieUpdatePage)

/*category endpoints*/
router.get('/movie/categoryList',CategoryController.list);
router.get('/movie/createCategory',(req,res,next)=>{
    res.render("moviePages/createCategory");
});
router.post('/movie/createCategory',CategoryController.save);

/*person endpoints*/
router.get('/movie/personList',PersonController.list);
router.get('/movie/createPerson',(req,res,next)=>{
    res.render("moviePages/createPerson");
});
router.post('/movie/createPerson',PersonController.save);

module.exports = router;