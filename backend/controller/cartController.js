const cartModel = require('../models/cart');

exports.addItemToCart = async (req, res) => {
    try {
        const uid = req.user._id;

        const iscartExist = await cartModel.findOne({ user: uid });

        if (iscartExist) {
            /// if cart is exist
            const pid = req.body.cartItems.productId;
            const isitemadded = iscartExist.cartItems.find(c => c.productId == pid);

            let condition, action, msg;

            if (isitemadded) {
                action = {
                    "$set": {
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity: isitemadded.quantity + parseInt(req.body.cartItems.quantity)
                        }
                    }
                };

                condition = { "user": uid, "cartItems.productId": pid };
                msg = "Quantity Updated";
            } else {
                console.log('com');
                action = {
                    "$push": {
                        "cartItems": [req.body.cartItems]
                    }
                };
                condition = { user: uid };
                msg = "Item Added into cart";
            }
            const upresp = await cartModel.findOneAndUpdate(condition, action);
            console.log(upresp);
            if (upresp) {
                return res.status(200).send({ message: msg, upresp });
            }

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