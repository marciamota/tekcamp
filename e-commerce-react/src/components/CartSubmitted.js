import React from 'react';
import classes from './CartSubmitted.module.css';

const CartSubmitted = () => {
    return (
        <div className={classes.error}>
            <p>Your order was submitted successfully.</p>
        </div>
    );
};

export default CartSubmitted;