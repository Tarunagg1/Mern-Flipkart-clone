import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom';
import Signin from './containers/Signin'
import './App.css';
import Signup from './containers/SignUp'
import Home from './containers/Home'
import PrivateRoute from './components/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { isuserLogiIn } from './actions/auth.action'
import Products from './components/products';
import Order from './containers/orders';
import Category from './containers/category';
import { getAllCategory, getProducts } from './actions';
import page from './containers/newPage';

export default function App() {
  const dispatch = useDispatch()

  const au = useSelector(state => state.auth);

  useEffect(() => {
    if (!au.authenticate) {
      dispatch(isuserLogiIn());
    }

    dispatch(getProducts());
    dispatch(getAllCategory());

  }, [])

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/page" exact component={page} />
        <PrivateRoute path="/products" exact component={Products} />
        <PrivateRoute path="/orders" exact component={Order} />
        <PrivateRoute path="/category" exact component={Category} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </div>
  )
}
