import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <h1 className={classes.companyname}>Marcia's E-Commerce</h1>
            <div className={"ui mini icon input " + classes.smaller} >
                <i className="search icon"></i>
                <input type="text" placeholder="Search..."/>
            </div>
            <NavLink to='/shopping-cart' className='item'>
                Shopping Cart <i class="shopping cart icon"></i>
            </NavLink>
        </div>
    );
};

export default Header;