const router = require('express').Router();
const { addAddress,getAddress } = require('../controller/addressController');
const validatetoken = require('../middleware/validatetoken');
const { userMiddleware } = require('../middleware/roleValidation');


router.post('/user/address/addaddress', validatetoken, userMiddleware, addAddress);
router.get("/user/address/getaddress",validatetoken,userMiddleware, getAddress);

module.exports = router;
