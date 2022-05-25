import React, { Fragment } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Header from './components/Header';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';

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
          <Profile />
        </Route>
        <Route path="*">
          <Redirect to="/dashboard" />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
