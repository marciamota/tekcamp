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
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const clearCart = () => {
    setCart([]);
  };

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
  };

  // load posts info (axios)
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      setOriginalProducts(data);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!firstRun.current) {
      setProducts(originalProducts);
    }
  }, [originalProducts]);

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
              <ShoppingCart 
                cart={cart} 
                modifyCart={setCart} 
                productList={originalProducts} 
                updateCart={updateCart}
                clearCart={clearCart}/>
            </Route>
            <Route path="/manage-store">
              <ManagePage 
                productList={originalProducts} 
                setOriginalProducts={setOriginalProducts}
                setProducts={setProducts}/>
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
