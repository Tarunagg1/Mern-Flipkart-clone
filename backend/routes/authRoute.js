const router = require('express').Router();
const { signup, signin } = require('../controller/authController');
const { validateSignup, isRequestValidator, validateSignin } = require('../validators/auth')
const validateTokenMiddleware = require('../middleware/validatetoken');

router.post('/signup', validateSignup, isRequestValidator, signup);
router.post('/signin', validateSignin, isRequestValidator, signin)

router.post('/profile', validateTokenMiddleware, (req, res) => {
    console.log(req.user);
    return res.status(200).send("okijuhy")
})

module.exports = router;