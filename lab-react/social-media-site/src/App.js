import React, { Fragment } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Loader from './components/Loader';

function App() {

  // load user profile info (axios)
  
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/profile">
          {/* <Profile /> */}
          <Loader />
        </Route>
        <Route path="*">
          <Redirect to="/dashboard" />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
