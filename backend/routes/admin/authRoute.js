const router = require('express').Router();
const { signup, signin } = require('../controller/authController');
const validateTokenMiddleware = require('../middleware/validatetoken');

router.post('/signin', signin)
router.post('/signup', signup);

router.post('/profile', validateTokenMiddleware, (req, res) => {
    console.log(req.user);
    return res.status(200).send("okijuhy")
})

module.exports = router;