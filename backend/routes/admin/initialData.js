const router = require('express').Router();
const {initialData} = require('../../controller/admin/initialData');
const validatetoken = require('../../middleware/validatetoken');
const { adminMiddleware } = require('../../middleware/roleValidation');


router.get('/initialdata',validatetoken,adminMiddleware,initialData );


module.exports = router;