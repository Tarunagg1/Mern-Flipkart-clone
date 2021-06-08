const jwt = require('jsonwebtoken');

const validatetoken = async (req, res, next) => {
    try {
        // console.log('okiju');
        // console.log(req.headers);
        const token = req.headers.authrization.split(" ")[1];
        // console.log(token);
        // console.log(token);
        const userinfo = jwt.verify(token, process.env.SECRET_TOKEN);
        if (!userinfo) {
            return res.status(500).send({ message: "Token not provided" });
        }
        req.user = userinfo;
        next();
    } catch (error) {
        return res.status(500).send({ message: "Token is expire or invalid" });
    }
}

module.exports = validatetoken;