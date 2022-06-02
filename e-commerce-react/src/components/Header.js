import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';

const Header = () => {
    return (
        <div className={"ui stackable menu"}>
            <h1 className={classes.companyname}>Marcia's E-Commerce</h1>
            <div className='right menu'>
                <div className={"ui mini icon input " + classes.smaller} >
                    <i className="search icon"></i>
                    <input type="text" placeholder="Search..." />
                </div>
                <NavLink to='/products' className='item'>
                    Products
                </NavLink>
                <NavLink to='/shopping-cart' className='item'>
                    Shopping Cart <i className="shopping cart icon"></i>
                </NavLink>
                <NavLink to='/products' className='item'>
                    Login
                </NavLink>
            </div>
        </div>
    );
};

export default Header;