import React,{useEffect} from 'react';
import './App.css';
import Homepage from './container/HomePage';
import {BrowserRouter as Router , Route,Switch} from 'react-router-dom';
import ProductListpages from './container/ProductsListPage.js';
import { useDispatch,useSelector } from 'react-redux';
import { isuserLogiIn, updateCart } from './actions';
import ProdyuctDetailsPage from './container/productDetailsPage';
import CartPage from './container/CartPage';
import CheckoutPage from './container/checkoutPage';

function App() {
  const dispatch = useDispatch();
  const {authenticate} = useSelector(state => state.auth)
  
  useEffect(() => {
    if(!authenticate){
      dispatch(isuserLogiIn())
    }
  }, [authenticate])

  useEffect(() => {
      dispatch(updateCart())
  }, [])

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/cart" component={CartPage} exact />
          <Route path="/checkout" component={CheckoutPage} exact />
          <Route path="/:slug/:productid/p" component={ProdyuctDetailsPage} exact />
          <Route path="/:slug" component={ProductListpages} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
