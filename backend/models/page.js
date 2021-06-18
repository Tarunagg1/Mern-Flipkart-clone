const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        trim: true
    },
    banners: [
        {
            img: String
        }
    ],
    products: [
        {
            img: String
        }
    ],
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true,
        unique: true
    }

}, { timestamps: true })


const pageModal = mongoose.model('page', pageSchema);

module.exports = pageModal;








