const router = require('express').Router();
const { addItemToCart,getCartItems } = require('../controller/cartController');
const validatetoken = require('../middleware/validatetoken');
const { userMiddleware } = require('../middleware/roleValidation');


router.post('/cart/addtocart', validatetoken, userMiddleware, addItemToCart);
router.get("/cart/getproduct",validatetoken,userMiddleware, getCartItems);

module.exports = router;
