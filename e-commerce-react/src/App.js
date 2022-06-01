import React, { Fragment, useState, useEffect, useRef } from 'react';
// import './App.css';
import classes from './App.module.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import axios from 'axios';

import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';
import ShoppingCart from './pages/ShoppingCart';
import Loader from './components/Loader';
import FetchDataError from './components/FetchDataError';

import Header from './components/Header';

function App() {
  // to prevent useEffect from calling the api more than once
  const firstRun = useRef(true);
  const [products, setProducts] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products')
      if (response && response.data) {
        setProducts(response.data);
      } else {
        setFetchError(true);
      }
    } catch (error) {
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  }

  // load posts info (axios)
  useEffect(() => {
    if (products.length === 0 && firstRun.current) {
      firstRun.current = false;
      getProducts();
    }
  }, [products]);

  return (
    <div className={classes.appcontainer}>
      <Header />
      {
        loading ? <Loader /> :
          fetchError ? <FetchDataError /> :
            <Switch>
              <Route path="/products/:id" >
                <ProductDetail />
              </Route>
              <Route path="/products">
                <ProductList productList={products} />
              </Route>
              <Route path="/shopping-cart">
                <ShoppingCart />
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
