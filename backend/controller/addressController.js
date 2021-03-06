const addressModal = require('../models/address');

exports.addAddress = (req,res) => {
    const {payload} = req.body;
    const uid = req.user._id;
    if(payload.address){
        addressModal.findOneAndUpdate({ user: uid },{
            "$push":{
                "address":payload.address
            }
        }, {new:true,upsert:true})
        .exec((error,address) => {
            if(error) return res.status(400).json({error})
            if(address){
                return res.status(201).json({address});
            }
        });
    }else{
        res.status(400).json({error:"Params address required"});
    }
}


exports.getAddress = (req,res) => {
    console.log(req.user._id);
    addressModal.findOne({user:req.user._id})
    .exec((error,userAddress) => {
        if(error) return res.status(400).json({error});
        return res.status(200).json({userAddress});
    })   
}