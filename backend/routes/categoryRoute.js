const router = require('express').Router();
const { addCategory, getCategory,updateCategories,deleteCategories } = require('../controller/admin/categoryController');
const validatetoken = require('../middleware/validatetoken');
const { adminMiddleware } = require('../middleware/roleValidation');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'public/category'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

var upload = multer({ storage: storage });


router.post('/category/create', validatetoken, adminMiddleware, upload.single('categoryimg'), addCategory);
router.get("/category/getcategory", getCategory);
router.post('/category/update', validatetoken, adminMiddleware, upload.array('categoryimg'), updateCategories);
router.post('/category/delete', validatetoken, adminMiddleware, deleteCategories);


module.exports = router;
