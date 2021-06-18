const router = require('express').Router();
const { addProduct } = require('../controller/productController');
const validatetoken = require('../middleware/validatetoken');
const { adminMiddleware } = require('../middleware/roleValidation');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const {getProductBySlug,getProductDetailsById} = require('../controller/productController')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), '/public/products'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})


var upload = multer({ storage: storage });


router.post('/product/create', validatetoken, adminMiddleware, upload.array('productPicture', 12), addProduct);
router.get("/products/:slug", getProductBySlug);
router.get("/product/:pid", getProductDetailsById);

module.exports = router;
