const { check, validationResult } = require('express-validator');

exports.validateSignup = [
    check('firstname').notEmpty().withMessage("Enter The firstname"),
    check('lastname').notEmpty().withMessage("Enter the lastnamer"),
    check('email').isEmail().withMessage("Enter valid Email"),
    check('password').isLength({ min: 5 }).withMessage("min 5 digit password required")
];

exports.validateSignin = [
    check('email').isEmail().withMessage("Enter valid Email"),
    check('password').isLength({ min: 5 }).withMessage("min 5 digit password required")
]

exports.isRequestValidator = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({ error: errors.array()[0].msg, msg: "validation fail" });
    }
    next();
}