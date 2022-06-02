import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './ProductCard.module.css';

const ProductCard = (props) => {
    const addToCartHandler = () => {
        // to do 
        props.updateCart(props.data.id, "increment");
    };

    return (
        <div className="card">
            <div className="image">
                <img alt="product" src={props.data.image} />
            </div>
            <div className="content">
                <Link href="JavaScript:void(0);" className="header" to={'/products/' + props.data.id}>{props.data.title} ${props.data.price}</Link>
                <p>
                    {props.data.available} available.
                </p>
            </div>
            <div className={"ui input " + classes.cardbutton}>
                <button className="ui basic button" onClick={addToCartHandler} title="Add to cart" disabled={props.data.available < 1}>
                    <i className="shopping cart icon"></i>
                    {props.data.available < 1 ? "Sold out" : "Add to cart"}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;