import React, { useState, useEffect, useRef } from 'react';
// import classes from './App.module.css';
import { Route, Redirect, Switch } from 'react-router-dom';

import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';
import ShoppingCart from './pages/ShoppingCart';
import Loader from './components/Loader';
// import FetchDataError from './components/FetchDataError';
import data from './resources/products.json';
// import Login from './pages/Login';
import LoginPage from './pages/LoginPage';
import ManagePage from './pages/ManagePage';
import Header from './components/Header';

function App() {
  // to prevent useEffect from calling the api more than once
  const firstRun = useRef(true);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([
    { productId: 1, quantity: 2, price: 44.44, name: "something", available: 3 },
    { productId: 2, quantity: 5, price: 44.44, name: "something", available: 3 }
  ]);
  // [
  //   {productId: 1, quantity: 2, price: 44.44, name: something, available: 3},
  //   {productId: 2, quantity: 5, price: 44.44, name: something, available: 3}
  // ]
  // const [fetchError, setFetchError] = useState(false);
  const [loading, setLoading] = useState(true);

  // load posts info (axios)
  useEffect(() => {
    if (products.length === 0 && firstRun.current) {
      firstRun.current = false;
      setOriginalProducts(data);
      setProducts(data);
      setLoading(false);
    }
  }, [products]);

  return (
    <div>
      <Header productList={originalProducts} setProducts={setProducts}/>
      {
        loading ? <Loader /> :
          <Switch>
            <Route path="/products/:id" >
              <ProductDetail productList={originalProducts} />
            </Route>
            <Route path="/products">
              <ProductList productList={products} />
            </Route>
            <Route path="/shopping-cart">
              <ShoppingCart cart={cart} modifyCart={setCart} />
            </Route>
            <Route path="/manage-store">
              <ManagePage productList={originalProducts} />
            </Route>
            <Route path="/login-page">
              <LoginPage />
            </Route>
            <Route path="*">
              <Redirect to="/products" />
            </Route>
          </Switch>
      }
    </div>
  );
}

export default App;
