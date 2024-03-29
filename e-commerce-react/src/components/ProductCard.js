import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../store/app-context';
import classes from './ProductCard.module.css';

const ProductCard = (props) => {
    const appCtx = useContext(AppContext);
    const addToCartHandler = () => {
        appCtx.updateCart(props.data.id, "increment");
    };

    return (
        <div className="card" title={"category: "+ props.data.category}>
            <div className="image">
                <img alt="product" src={props.data.image} />
            </div>
            <div className="content">
                <Link 
                    href="" 
                    className="header" 
                    to={'/products/' + props.data.id}
                >
                    {props.data.title} ${props.data.price}
                </Link>
                <p>
                    {props.data.available} available.
                </p>
            </div>
            <div className={"ui input " + classes.cardbutton}>
                <button 
                    className="ui basic button" 
                    onClick={addToCartHandler} 
                    title="Add to cart" 
                    disabled={props.data.available < 1}
                >
                    <i className="shopping cart icon"></i>
                    {props.data.available < 1 ? "Sold out" : "Add to cart"}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;