const router = require('express').Router();
const {initialData} = require('../../controller/admin/initialData');
const validatetoken = require('../../middleware/validatetoken');


router.get('/initialdata',initialData );


module.exports = router;