const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:50
    },
    number:{
        type:String,
        required:true,
        trim:true,
    },
    pincode:{
        type:String,
        required:true,
        trim:true,
        min:6,
        max:50
    },
    locality:{
        type:String,
        required:true,
        trim:true,
        min:10,
        max:100
    },
    address:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:50
    },
    citydistricttown:{
        type:String,
        trim:true,
        min:3,
        max:50
    },
    state:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:50
    },
    landmark:{
        type:String,
        trim:true,
        min:3,
        max:50
    },
    alternatephone:{
        type:String
    },
    addresstype:{
        type:String,
        required:true,
        enum:['home','work']
    }    
    
})

const userAddressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    address:[addressSchema]
},{ timestamps: true })

module.exports = mongoose.model('userAddress', userAddressSchema);
