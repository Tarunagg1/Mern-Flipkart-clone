const productModel = require('../models/product');
const slugfy = require('slugify');
const caregoryModal = require('../models/category');

exports.addProduct = async (req, res) => {
    const { name, price, quantity, description, category } = req.body;

    let productsPictures = [];
    // console.log(req.files);
    if (req.files.length > 0) {
        productsPictures = req.files.map(file => {
            return {
                img: file.filename
            }
        });
    }

    const product = new productModel({
        name,
        slug: slugfy(name),
        price,
        quantity,
        description,
        productsPictures,
        category,
        createdBy: req.user._id
    });
    // console.log(product);
    try {
        const resp = await product.save();
        return res.status(201).json({ product: resp });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: "something went wrong", error });
    }
}


exports.getProductBySlug = (req, res) => {
    const { slug } = req.params;
    caregoryModal.findOne({ slug }).select("_id")
        .exec((err, category) => {
            if (err) {
                return res.status(200).json({ message: "Product not found", err })
            }
            if (category) {

                productModel.find({ category: category._id })
                    .exec((err, product) => {
                        if (err) {
                            return res.status(200).json({ message: "Product not found", err })
                        }
                        if (product.length > 0) {
                            return res.status(200).json({
                                product,
                                productsByPrice: {
                                    under5k: product.filter(product => product.price <= 5000),
                                    under10k: product.filter(product => product.price > 5000 && product.price <= 10000),
                                    under15k: product.filter(product => product.price > 10000 && product.price <= 15000),
                                    under20k: product.filter(product => product.price > 15000 && product.price <= 20000),
                                    under30k: product.filter(product => product.price > 20000 && product.price <= 30000),
                                }
                            })
                        }
                    })
            }
        })
}

