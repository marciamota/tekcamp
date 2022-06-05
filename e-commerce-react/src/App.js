import React, { useContext } from 'react';
import { Route, Redirect, Switch, useLocation } from 'react-router-dom';

import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';
import ShoppingCart from './pages/ShoppingCart';
import Loader from './components/Loader';
import LoginPage from './pages/LoginPage';
import ManagePage from './pages/ManagePage';
import Header from './components/Header';
import AppContext from './store/app-context';

function App() {
  const appCtx = useContext(AppContext);

  return (
    <div>
      <Header />
      {
        appCtx.loading ? <Loader /> :
          <Switch>
            <Route path="/products/:id" >
              <ProductDetail />
            </Route>
            <Route path="/products">
              <ProductList />
            </Route>
            <Route path="/shopping-cart">
              <ShoppingCart />
            </Route>
            {
              appCtx.isAdmin &&
              <Route path="/manage-store">
                <ManagePage />
              </Route>
            }
            {!appCtx.user &&
              <Route path="/login-page">
                <LoginPage />
              </Route>
            }
            <Route path="*">
              <Redirect to="/products" />
            </Route>
          </Switch>
      }
    </div>
  );
}

export default App;
