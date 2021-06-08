const router = require('express').Router();
const { signup, signin ,signOut} = require('../../controller/admin/authController');
const validatetoken = require('../../middleware/validatetoken');
const { validateSignup, isRequestValidator, validateSignin } = require('../../validators/auth')


router.post('/admin/signin', validateSignin, isRequestValidator, signin)
router.post('/admin/signup', validateSignup, isRequestValidator, signup);
router.post("/admin/signout",signOut)

// router.post('/profile', validateTokenMiddleware, (req, res) => {
//     console.log(req.user);
//     return res.status(200).send("okijuhy")
// })

module.exports = router;