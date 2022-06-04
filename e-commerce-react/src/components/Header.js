import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';

const Header = (props) => {
    // const [filterTerm, setFilterTerm] = useState("");
    const filterTerm = useRef("");
    const filterHandler = () => {
        const searchTerm = filterTerm.current.value;
        const filteredProducts = props.productList.filter((product) => {
            return product.title.toUpperCase().includes(searchTerm.toUpperCase()) || 
                product.category.toUpperCase().includes(searchTerm.toUpperCase());
        });
        props.setProducts(filteredProducts);
    }

    const logoutHandler = () => {
        props.setUser(null);
        props.setIsAdmin(false);
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("isAdmin");
    };

    return (
        <div className={"ui stackable mini menu"}>
            <h1 className={classes.companyname}>Marcia's E-Commerce</h1>
            <div className='right menu'>
                <div className={"ui mini icon input " + classes.smaller} >
                    <i className="search icon"></i>
                    <input type="search" placeholder="Filter Name or Category" onChange={filterHandler} ref={filterTerm} />
                </div>
                <NavLink to='/products' className='item'>
                    Products
                </NavLink>
                <NavLink to='/shopping-cart' className='item'>
                    Shopping Cart <i className="shopping cart icon"></i>
                </NavLink>
                {props.isAdmin &&
                <NavLink to='/manage-store' className='item'>
                    Manage Store
                </NavLink>
                }
                {props.user ?
                    <a href="#" className='ui item' onClick={logoutHandler}>
                        Logout
                    </a> 
                    // <NavLink to='#' className='item' onClick={logoutHandler}>
                    //     Logout
                    // </NavLink>
                    :
                    <NavLink to='/login-page' className='item'>
                        Login
                    </NavLink>
                }
            </div>
        </div>
    );
};

export default Header;