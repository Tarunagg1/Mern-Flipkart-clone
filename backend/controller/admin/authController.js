const userModel = require('../../models/user');
const jwt = require('jsonwebtoken');
const shortid = require('shortid');

exports.signup = (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    userModel.findOne({ email })
        .exec((err, user) => {
            if (user) {
                return res.status(400).json({
                    message: "admin Allready exists"
                });
            }
            const _newuser = new userModel({ firstname, lastname, username: shortid.generate(), email, password, role: 'admin' });
            // console.log(_newuser);
            _newuser.save((err, data) => {
                if (err) {
                    return res.status(400).json({ message: "something went wrong" });
                }
                if (data) {
                    return res.status(200).json({ message: 'user created', user: data })
                }
            })
        })
}

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            if (user.role !== 'admin') {
                return res.status(400).json({ message: "You are not admin" });
            }
            if (user.authenticate(password)) {
                const token = await jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET_TOKEN, { expiresIn: '15d' });
                const { firstname, lastname, email, fullname } = user;
                res.cookie('token', token, { expiresIn: '1h' });
                return res.status(200).json({ message: "admin Login", token, user: { firstname, lastname, email, role: 'admin', fullname } });
            } else {
                return res.status(400).json({ message: "Invalid email or password" });
            }
        } else {
            return res.status(400).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        return res.status(400).send({ message: "something went wrong", error });
    }
}

exports.signOut = async (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({
        mmessage:"Signout successfully..."
    })
}