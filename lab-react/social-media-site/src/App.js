import React, { Fragment, useEffect, useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Loader from './components/Loader';
import UserDataError from './components/UserDataError';

function App() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    city: "",
    state: "",
    country: "",
    status: "empty",
  });
  const getUserData = async () => {
    try {
      const response = await axios.get('https://dummyapi.io/data/v1/user/60d0fe4f5311236168a109ca', {
        headers: {
          'app-id': '628c349e8a3a1d57ffc8437f'
        }
      })
      if (response && response.data) {
        const userInfo = {
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          gender: response.data.gender,
          dateOfBirth: response.data.dateOfBirth,
          city: response.data.location.city,
          state: response.data.location.state,
          country: response.data.location.country,
          status: "ok",
        };
        setUserData(userInfo);
      } else {
        const userInfo = {
          ...userData,
          status: "error",
        };
        setUserData(userInfo);
      }
    } catch (error) {
      const userInfo = {
        ...userData,
        status: "error",
      };
      setUserData(userInfo);
    }

  }

  // load user profile info (axios)
  useEffect(() => {
    if (userData.status !== "ok") {
      getUserData();

      // axios.get('https://dummyapi.io/data/v1/user/60d0fe4f5311236168a109ca', {
      //   headers: {
      //     'app-id': '628c349e8a3a1d57ffc8437f'
      //   }
      // }).then((response) => {
      //   if (response && response.data) {
      //     const userInfo = {
      //       firstName: response.data.firstName,
      //       lastName: response.data.lastName,
      //       gender: response.data.gender,
      //       dateOfBirth: response.data.dateOfBirth,
      //       city: response.data.location.city,
      //       state: response.data.location.state,
      //       country: response.data.location.country,
      //     };
      //     setUserData(userInfo);
      //   } else {
      //     setFetchUserDataFailed(true);
      //     setUserData('error');
      //   }
      // }).catch((error) => {
      //   setFetchUserDataFailed(true);
      //   setUserData('error');
      // });
    }
  }, [userData]);

  return (
    <Fragment>
      <Header />
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/profile">
          {
            userData.status === "empty" ?
              <Loader /> :
              userData.status === "error" ?
                <UserDataError /> :
                <Profile userData={userData} />
          }
        </Route>
        <Route path="*">
          <Redirect to="/dashboard" />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
