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
    { productId: 1, quantity: 2},
  ]);
  const [loading, setLoading] = useState(true);

  const updateCart = (id, action) => {
    // make a copy of cart and originalProducts
    const cartCopy = [...cart];
    const originalProductsCopy = [...originalProducts];

    // find if the added item already exist in the cart
    let itemInCartIndex = cartCopy.findIndex((item) => {
      return item.productId == id;
    });

    // find the index of the added item in the original products array
    let originalProductsIndex = originalProducts.findIndex((item) => {
      return item.id == id;
    });

    if (action === "increment") {
      // reduce the availble quantity by 1
      originalProductsCopy[originalProductsIndex].available--;
      setOriginalProducts(originalProductsCopy);
      // increase cart quantity or add to cart
      if (itemInCartIndex != -1) {
        // if the added item exist in the cart then increase its quantity by 1
        cartCopy[itemInCartIndex].quantity++;
      } else {
        // if item is not yet in the cart then add it to the cart
        cartCopy.push({ productId: id,  quantity: 1 });
      }
      setCart(cartCopy);
    } else {
      // increase the availble quantity by 1
      originalProductsCopy[originalProductsIndex].available++;
      setOriginalProducts(originalProductsCopy);
      cartCopy[itemInCartIndex].quantity--;
    }
    console.log('wait')
  };

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
              <ProductDetail productList={originalProducts} updateCart={updateCart}/>
            </Route>
            <Route path="/products">
              <ProductList productList={products} updateCart={updateCart}/>
            </Route>
            <Route path="/shopping-cart">
              <ShoppingCart cart={cart} modifyCart={setCart} productList={originalProducts} />
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
