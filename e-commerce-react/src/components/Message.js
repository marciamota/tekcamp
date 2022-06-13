import React from 'react';
import classes from './Message.module.css';

const getMessageText = (message) => {
    if (message === 'empty-cart') {
        return "Your Cart is empty."
    } else if (message === 'cart-submitted') {
        return "Your order was submitted successfully."
    } else if (message === 'product-not-found') {
        return "Sorry, we couldn't find this product."
    } else {
        return "Oops, something went wrong."
    }
};

const EmptyCart = (props) => {
    const messageText = getMessageText(props.message);

    return (
        <div className={classes.message}>
            <p>{messageText}</p>
        </div>
    );
};

export default EmptyCart;