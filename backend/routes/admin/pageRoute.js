const router = require('express').Router();
const validatetoken = require('../../middleware/validatetoken');
const { adminMiddleware } = require('../../middleware/roleValidation');
const {createPage,getPages} = require('../../controller/admin/pageController');
const { upload } = require('../../common-middleware');

router.post('/page/create', validatetoken, adminMiddleware,upload.fields([
    {name:'banners'},
    {name:'products'}
]) ,createPage);

router.get('/page/:category/:type',validatetoken,getPages);


module.exports = router;