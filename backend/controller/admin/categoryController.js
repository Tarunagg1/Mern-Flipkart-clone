const categoryModel = require('../../models/category');
const slugify = require('slugify');
const shortid = require('shortid');

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
            parentid: cate.parentId,
            children: createCategories(categories, cate._id)
        });
    }

    return caregoryList;
};


exports.addCategory = async (req, res) => {
    const { name } = req.body;
    // console.log(req.body);
    const caregoryobj = {
        name: name,
        slug: `${slugify(name)}-${shortid.generate()}`,
    }

    if (req.body.parentId) {
        caregoryobj.parentId = req.body.parentId
    }

    if (req.body.parentId == undefined) {
        caregoryobj.parentId = undefined;
    }

    if (req.file) {
        caregoryobj.categoryImage = process.env.App + "/public/category/" + req.file.filename
    }
    const cat = new categoryModel(caregoryobj);
    try {
        const category = await cat.save();
        return res.status(202).json({ category });
    } catch (error) {
        return res.status(400).json({ error, message: "something went wrong" })
    }
}


exports.getCategory = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        if (categories) {
            let categoriesList = createCategories(categories);
            return res.status(201).json({ categoriesList });
        }
    } catch (error) {
        return res.status(400).json({ error, message: "something went wrong" })
    }
}


exports.updateCategories = async (req, res) => {
    const { _id, name, parentId, type } = req.body;
    const updatedCategories = [];

    try {
        if (name instanceof Array) {
            for (let i = 0; i < name.length; i++) {

                const category = {
                    name: name[i],
                    type: type[i],
                }

                if (parentId !== "") {
                    category.parentId = parentId[i]
                }

                const resp = await categoryModel.findOneAndUpdate({ _id: _id[i] }, category, { new: true })
                updatedCategories.push(resp);
            }
            return res.status(201).json({ updatedCategories })
        } else {
            const category = {
                name, type
            }
            if (parentId !== "") {
                category.parentId = parentId[i]
            }

            const updateCategory = await categoryModel.findOneAndUpdate({ _id }, category, { new: true })
            return res.status(201).json({ updateCategory })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error, message: "something went wrong" })
    }
}

exports.deleteCategories = async (req,res) =>{
    // console.log(req.body);
    const {ides} = req.body.payload;
    const deletedCategoriesArray = [];
    
    for(let i=0; i<ides.length; i++){
        // const 
        // console.log(ides[i]);
        const deletecategory = await categoryModel.findByIdAndDelete({_id:ides[i]._id});
        deletedCategoriesArray.push(deletecategory);
    }   
    if(deletedCategoriesArray.length === ides.length){
        return res.status(201).json({message:"Category removed"})
    }else{
        return res.status(400).json({message:"something went wrong"})
    }
}