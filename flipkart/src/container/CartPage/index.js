import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Card from "../../container/Ui/Card/Card";
import { getCartItems } from "../../actions";
// import PriceDetails from "../../";

import "./style.css";
import { MaterialButton } from "../../components/Matrialui";
import Cartitem from "./CartItem";
import { addToCart } from "../../actions";


const CartPage = (props) => {
  const cart = useSelector((state) => state.cart);
  const { authenticate } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState(cart.cartItems);

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (authenticate) {
      dispatch(getCartItems());
    }
  }, [authenticate]);

  const onQuantityIncrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1));
  };

  const onQuantityDecrement = (_id, qty) => {
    console.log(qty);
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  };

  //   const onRemoveCartItem = (_id) => {
  //     dispatch(removeCartItem({ productId: _id }));
  //   };

  //   if (props.onlyCartItems) {
  //     return (
  //       <>
  //         {Object.keys(cartItems).map((key, index) => (
  //           <CartItem
  //             key={index}
  //             cartItem={cartItems[key]}
  //             onQuantityInc={onQuantityIncrement}
  //             onQuantityDec={onQuantityDecrement}
  //           />
  //         ))}
  //       </>
  //     );
  //   }

  return (
    <Layout>
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <Card
          headerLeft={`My Cart`}
          headerRight={<div>Deliver to</div>}
          style={{ width: "calc(100% - 400px)", overflow: "hidden" }}
        >
          {
            Object.keys(cartItems).map((key, index) => (
              <Cartitem
                key={key}
                cartItem={cartItems[key]}
                onQuantityInc={onQuantityIncrement}
                onQuantityDec={onQuantityDecrement}
              />
            ))
          }
          <div
            style={{
              width: "100%",
              display: "flex",
              background: "#ffffff",
              justifyContent: "flex-end",
              boxShadow: "0 0 10px 10px #eee",
              padding: "10px 0",
              boxSizing: "border-box",
            }}
          >
            <div style={{ width: "250px" }}>
              <MaterialButton
                title="PLACE ORDER"
                onClick={() => props.history.push(`/checkout`)}
              />
            </div>
          </div>
        </Card>

        {/* <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].qty;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
          }, 0)}
        /> */}
        <Card headerLeft="Price" style={{width:'380px'}} />
      </div>
    </Layout>
  );
};

export default CartPage;