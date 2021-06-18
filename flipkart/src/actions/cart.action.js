import axios from "../helpers/axios"
import { cartConstant } from "./constants"
import store from '../store';

const getCartItems = () => {
    return async dispatch => {
        try {
            dispatch({ type: cartConstant.ADD_TO_CART_REQUEST })
            console.log('uhuhu');
            const resp = await axios.get('/cart/getproduct');
            if (resp.status === 200) {
                const { cartItems } = resp.data;
                if (cartItems) {
                    dispatch({
                        type: cartConstant.ADD_TO_CART_SUCCESS,
                        payload: { cartItems }
                    })
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const addToCart = (product, newqty = 1) => {
    return async (dispatch) => {
        const { cart: { cartItems }, auth: { authenticate } } = store.getState();

        const qty = cartItems[product._id] ? parseInt(cartItems[product._id].qty + newqty) : 1;

        cartItems[product._id] = {
            ...product,
            qty
        };

        if (authenticate) {
            dispatch({ type: cartConstant.ADD_TO_CART_REQUEST });
            const payload = {
                cartItems: [
                    {
                        product: product._id,
                        quantity: qty
                    }
                ]
            }
            const resp = await axios.post('/cart/addtocart', payload);
            if (resp.status === 200) {
                dispatch(getCartItems())
            }
        } else {
            localStorage.setItem('cart', JSON.stringify(cartItems))
        }
        dispatch({ type: cartConstant.ADD_TO_CART_SUCCESS, payload: { cartItems } })
    }
}


export const updateCart = () => {
    return async (dispatch) => {
        const { auth: { authenticate } } = store.getState();

        const cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;

        if (authenticate) {
            localStorage.removeItem('cart');
            if (cartItems) {
                const payload = {
                    cartItems: Object.keys(cartItems).map((key) => {
                        return {
                            quantity: cartItems[key].qty,
                            product: cartItems[key]._id
                        }
                    })
                }
                if (Object.keys(cartItems).length > 0) {
                    const resp = await axios.post('/cart/addtocart', payload);
                    if (resp.status === 200) {
                        dispatch(getCartItems())
                    }
                }
            }
        } else {
            if (cartItems) {
                dispatch({
                    type: cartConstant.ADD_TO_CART_SUCCESS,
                    payload: { cartItems }
                })
            }
        }

    }
}

export {
    getCartItems
}