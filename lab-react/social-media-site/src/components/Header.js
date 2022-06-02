import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Header.module.css';
  
const Header = () => {
  return (
      <div className="ui secondary pointing menu">
        <h1 className={classes.logo}>My Twitter Clone</h1>
          <NavLink to='/dashboard' className='item'>
            Dashboard
          </NavLink>
          <NavLink to='/profile' className='item'>
            Profile
          </NavLink>
      </div>
  );
};
  
export default Header;