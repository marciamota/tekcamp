import React from 'react';
import { Link } from 'react-router-dom';
import classes from './ProductCard.module.css';

const ProductCard = (props) => {
    const addToCartHandler = () => {
        // to do 
    };

    return (
        <div className="card">
            <div className="image">
                <img alt="product" src={props.data.image} />
            </div>
            <div className="content">
                <Link href="JavaScript:void(0);" className="header" to={'/products/' + props.data.id}>{props.data.title} ${props.data.price}</Link>
            </div>
            <div className={classes.cardbutton}>
                <button className="ui basic button" onClick={addToCartHandler}>
                    <i className="shopping cart icon"></i>
                    Add To Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;