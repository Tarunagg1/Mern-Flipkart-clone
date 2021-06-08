const router = require('express').Router();
const { addItemToCart } = require('../controller/cartController');
const validatetoken = require('../middleware/validatetoken');
const { userMiddleware } = require('../middleware/roleValidation');


router.post('/cart/addtocart', validatetoken, userMiddleware, addItemToCart);
// router.get("/category/getcategory", getCategory);

module.exports = router;
