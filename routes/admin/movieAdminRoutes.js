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
router.get('/movie/more/:id',MovieController.listMore)
router.get('/movie/update/:id',MovieController.movieUpdatePage);
router.patch('/movie/update/:id',upload.single('cover'),MovieController.updateMovie);
router.delete('/movie/:id',MovieController.deleteMovie);


/*category endpoints*/
router.get('/movie/categoryList',CategoryController.list);
router.get('/movie/createCategory',(req,res,next)=>{
    res.render("moviePages/createCategory");
});
router.post('/movie/createCategory',CategoryController.save);
router.get('/movie/updateCategory/:id',CategoryController.updateGetPage)
router.patch('/movie/updateCategory/:id',CategoryController.updateCategory)
router.patch('/movie/categoryList',CategoryController.deleteCategory)

/*person endpoints*/
router.get('/movie/personList',PersonController.list);
router.get('/movie/personList/more/:id',PersonController.listMorePerson);

router.get('/movie/createPerson',(req,res,next)=>{
    res.render("moviePages/createPerson");
});
router.post('/movie/createPerson',PersonController.save);

router.get("/movie/updatePerson/:id",PersonController.personUpdateGetPage)
router.patch("/movie/updatePerson/:id",PersonController.updatePerson)
router.patch("/movie/personList",PersonController.deletePerson)

module.exports = router;