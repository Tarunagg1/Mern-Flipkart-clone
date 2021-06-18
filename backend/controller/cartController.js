const cartModel = require('../models/cart');

const runUpdate = async (condition, updateData) => {
    return new Promise((resolve, reject) => {
        cartModel.findOneAndUpdate(condition, updateData, { upsert: true })
            .then(result => resolve(result))
            .catch(err => reject(err))
    })
}

exports.addItemToCart = async (req, res) => {
    try {
        const uid = req.user._id;
        const iscartExist = await cartModel.findOne({ user: uid });
        if (iscartExist) {
            /// if cart is exist
            let PromiseArray = [];

            req.body.cartItems.forEach((cartItem) => {
                const product = cartItem.product;
                const item = iscartExist.cartItems.find(c => c.product == product);
                let condition, update;
                if (item) {
                    console.log('n');
                    condition = { "user": uid, "cartItems.product": product };
                    update = {
                        "$set": {
                            "cartItems.$": cartItem
                        }
                    };
                } else {
                    condition = { user: uid };
                    update = {
                        "$push": {
                            "cartItems": cartItem
                        }
                    };
                }
                PromiseArray.push(runUpdate(condition, update))
            })

            Promise.all(PromiseArray)
                .then(response => res.status(201).json({ response }))
                .catch(err => res.status(400).json({ err }))
        } else {
            const newcart = new cartModel({
                user: uid,
                cartItems: req.body.cartItems
            });
            const resp = await newcart.save();
            return res.status(200).json({ cart: resp, message: "New Cart Created" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: "something went wrong", error });
    }
}


exports.getCartItems = (req, res) => {
    //const { user } = req.body.payload;
    //if(user){
    cartModel.findOne({ user: req.user._id })
        .populate("cartItems.product", "_id name price productsPictures")
        .exec((error, cart) => {
            if (error) return res.status(400).json({ error });
            if (cart) {
                let cartItems = {};
                cart.cartItems.forEach((item, index) => {
                    cartItems[item.product._id.toString()] = {
                        _id: item.product._id.toString(),
                        name: item.product.name,
                        img: item.product.productsPictures[0].img,
                        price: item.product.price,
                        qty: item.quantity,
                    };
                });
                res.status(200).json({ cartItems });
            }
        });
    //}
};


