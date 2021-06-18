const productModal = require('../../models/product');
const categoryModal = require('../../models/category');


function createCategories(categories, parentId = null) {
    const caregoryList = [];

    let category;

    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == 'undefined');
    } else {
        category = categories.filter(cat => cat.parentId == parentId);
    }

    for (let cate of category) {
        caregoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentid:cate.parentId,
            type:cate.type,
            children: createCategories(categories, cate._id)
        });
    }

    return caregoryList;
};

exports.initialData = async (req,res)=>{
    const categories = await categoryModal.find({});
    const products = await productModal.find({}).select('_id name category price slug quantity description ').populate('category');
    return res.status(200).json({
        categories:createCategories(categories),
        products
    })
}