import React, { useRef, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classes from './Header.module.css';
import AppContext from '../store/app-context';

const Header = () => {
    const appCtx = useContext(AppContext);
    const location = useLocation();
    const filterTerm = useRef("");
    const filterHandler = () => {
        const searchTerm = filterTerm.current.value;
        let filteredProducts = [];
        if (searchTerm.length > 0) {
            filteredProducts = appCtx.originalProducts.filter((product) => {
                return product.title.toUpperCase().includes(searchTerm.toUpperCase()) ||
                    product.category.toUpperCase().includes(searchTerm.toUpperCase());
            });
        } else {
            filteredProducts = appCtx.products;
        }
        appCtx.setProducts(filteredProducts);
    }

    const logoutHandler = () => {
        appCtx.setUser(null);
        appCtx.setIsAdmin(false);
        localStorage.removeItem("user");
        localStorage.removeItem("isAdmin");
    };

    return (
        <div className={"ui stackable mini menu"}>
            <h1 className={classes.companyname}>Marcia's E-Commerce</h1>
            <div className='right menu'>
                {location.pathname === "/products" &&
                    <div className={"ui mini icon input " + classes.smaller} >
                        <i className="search icon"></i>
                        <input
                            type="search"
                            placeholder="Filter Name or Category"
                            onChange={filterHandler}
                            ref={filterTerm} />
                    </div>
                }
                <NavLink to='/products' className='item'>
                    Products
                </NavLink>
                <NavLink to='/shopping-cart' className='item'>
                    Shopping Cart
                    <i className="shopping cart icon"></i>
                    {appCtx.cartItemsCount ? appCtx.cartItemsCount : null}
                </NavLink>
                {appCtx.isAdmin &&
                    <NavLink to='/manage-store' className='item'>
                        Manage Store
                    </NavLink>
                }
                {appCtx.user ?
                    <a href="#" className='ui item' onClick={logoutHandler}>
                        Logout
                    </a>
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