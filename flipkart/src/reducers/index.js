import { combineReducers } from 'redux';

import caregoryReducer from './category.reducer';
import productReducer from './product.Reducer';


const rootReducer = combineReducers({
    category:caregoryReducer,   
    product:productReducer
})


export default rootReducer;