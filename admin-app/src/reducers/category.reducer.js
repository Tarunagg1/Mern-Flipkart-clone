import { categoryConstant } from "../actions/constants";

const initState = {
    categories: [],
    loading: false,
    error: null
}

const buildNewcategories = (parentId, categories, category) => {
    let mycaregories = [];

    if (parentId === "undefined") {
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                type: category.type,
                children: []
            }
        ];
    }

    for (let cat of categories) {
        if (cat._id === parentId) {

            const newCategory = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                type: category.type,
                children: []
            }

            mycaregories.push({
                ...cat,
                children: cat.children.length > 0 ? [...cat.children, newCategory] : [newCategory]
            });
        } else {
            mycaregories.push({
                ...cat,
                children: cat.children ? buildNewcategories(parentId, cat.children, category) : []
            });
        }
    }
    return mycaregories
}

export default (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case categoryConstant.GET_ALL_CATEGORIES_REQUEST:
            return { ...state, loading: true }
        case categoryConstant.GET_ALL_CATEGORIES_SUCCESS:
            return { ...state, categories: payload, loading: false }
        case categoryConstant.GET_ALL_CATEGORIES_FAIL:
            return { ...state, error: payload, loading: false }
        case categoryConstant.ADD_NEW_CATEGORY_REQUEST:
            return { ...state, loading: true }
        case categoryConstant.ADD_NEW_CATEGORY_SUCCESS:
            let updatedCategories = buildNewcategories(payload.category.parentId, state.categories, payload.category);
            return { ...state, loading: false, categories: updatedCategories }
        case categoryConstant.ADD_NEW_CATEGORY_FAIl:
            return { ...state, loading: false }
        case categoryConstant.UPDATE_CATEGORIES_REQUEST:
            return { ...state, loading: true }
        case categoryConstant.UPDATE_CATEGORIES_SUCCESS:
            return { ...state, loading: false }
        case categoryConstant.UPDATE_CATEGORIES_FALIUR:
            return { ...state, loading: false }
        case categoryConstant.DELETE_CATEGORIES_REQUEST:
            return { ...state, loading: true }
        case categoryConstant.DELETE_CATEGORIES_SUCCESS:
            return { ...state, loading: false }
        case categoryConstant.DELETE_CATEGORIES_FAILUER:
            return { ...state, loading: false }
        default:
            return { ...state }
    }
}
