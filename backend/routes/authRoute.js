const router = require('express').Router();
const { signup, signin } = require('../controller/admin/authController');
// const validateTokenMiddleware = require('../middleware/validatetoken');

router.post('/admin/signin', signin)
router.post('/admin/signup', signup);

// router.post('/profile', validateTokenMiddleware, (req, res) => {
//     console.log(req.user);
//     return res.status(200).send("okijuhy")
// })

module.exports = router;