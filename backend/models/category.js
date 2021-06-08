const mongoose = require('mongoose');

const categoryschem = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    categoryImage: {
        type: String
    },
    type:{
        type:String
    },
    parentId: {
        type: String
    },
}, { timestamps: true })


module.exports = mongoose.model('category', categoryschem);
