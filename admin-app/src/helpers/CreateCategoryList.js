const CreateCategoryList = (categories, options = []) => {
    if (categories) {
        for (let category of categories) {
            // console.log(category);
            options.push({ value: category._id, name: category.name, parentId: category.parentid,type:category.type });

            if (category.children.length > 0) {
                CreateCategoryList(category.children, options);
            }
        }
        return options
    }
}


export default CreateCategoryList;