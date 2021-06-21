import { combineReducers } from 'redux';

import caregoryReducer from './category.reducer';
import productReducer from './product.Reducer';
import authtReducer from './auth.reducer';
import cartReducer from './cart.reducer';
import userReducer from './user.Reducer';


const rootReducer = combineReducers({
    category:caregoryReducer,   
    product:productReducer,
    auth:authtReducer,
    cart:cartReducer,
    user:userReducer
})


export default rootReducer;