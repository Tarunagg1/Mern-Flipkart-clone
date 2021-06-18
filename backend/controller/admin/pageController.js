const pageModal = require('../../models/page');

exports.createPage = (req, res) => {
    const { banners, products } = req.files;
    if (banners) {
        if (banners.length > 0) {
            req.body.banners = banners.map((banner, ind) => (
                {
                    img: `${process.env.API}/public/${banner.filename}`,
                    navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`
                }
            ))
        }
    }

    if (products) {
        if (products.length > 0) {
            req.body.products = products.map((product, ind) => (
                {
                    img: `${process.env.API}/public/${product.filename}`,
                    navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`
                }
            ))
        }
    }

    req.body.createdby = req.user._id;

    pageModal.findOne({ category: req.body.category })
        .exec((error, page) => {
            if (error) {
                return res.status(400).json({ err })
            }
            if (page) {
                pageModal.findOneAndUpdate({ category: req.body.category }, req.body)
                    .exec((err, updatedpars) => {
                        if (err) {
                            return res.status(400).json({ err })
                        }
                        if (updatedpars) {
                            return res.status(400).json({ page: updatedpars })
                        }
                    })
            } else {
                const page = new pageModal(req.body);
                page.save((err, page) => {
                    if (err) {
                        return res.status(400).json({ err })
                    }
                    if (page) {
                        return res.status(201).json({ message: "page created", page })
                    }
                })
            }

        })
}


exports.getPages = async (req,res)=>{
    const {category,type} = req.params;
    if(type === "page"){
        pageModal.findOne({category:category})
        .exec((error,page) => {
            if(error){
                return res.status(400).json({error})
            }
            if(page) return res.status(200).json(page);
        })
    }
}

