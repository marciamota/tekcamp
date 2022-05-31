import React, { Fragment } from 'react';
import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';
import ShoppingCart from './pages/ShoppingCart';

import Header from './components/Header';

function App() {
  return (
    <Fragment>
       <Header /> 
      <Switch>
        <Route path="/products/:id" >
          <ProductDetail />
        </Route>
        <Route path="/products" component={ProductList} />
        <Route path="/shopping-cart" component={ShoppingCart} />
        <Route path="*">
          <Redirect to="/products" />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
