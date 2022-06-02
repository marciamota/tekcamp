import React from 'react';
import classes from './EmptyCart.module.css';

const EmptyCart = () => {
    return (
        <div className={classes.error}>
            <p>Your Cart is empty.</p>
        </div>
    );
};

export default EmptyCart;