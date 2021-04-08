const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchems = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    username: {
        type: String,
        required: true,
        index: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    contactNumber: {
        type: Number,
    },
    profilePicture: {
        type: String
    }
}, { timestamps: true })

userSchems.virtual('password')
    .set(function (password) {
        this.hash_password = bcrypt.hashSync(password, 12);
    });

userSchems.virtual('fullname')
    .get(function () {
        return `${this.firstname} ${this.lastname}`;
    })

userSchems.methods = {
    authenticate: function (password) {
        return bcrypt.compareSync(password, this.hash_password);
    }
}


module.exports = mongoose.model('user', userSchems);
