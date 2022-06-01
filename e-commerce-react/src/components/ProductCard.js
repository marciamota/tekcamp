import React from 'react';
import classes from './ProductCard.module.css';

const ProductCard = (props) => {
    return (
        <div className="card">
            <div className="image">
                <img alt="product" src={props.data.image} />
            </div>
            <div className="content">
                <p className="header">{props.data.title} ${props.data.price}</p>
            </div>
            <div className={classes.cardbutton}>
                <button className="ui basic button">
                    <i className="shopping cart icon"></i>
                    Add To Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;