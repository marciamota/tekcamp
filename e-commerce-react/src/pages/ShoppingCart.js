import React, { Fragment } from 'react';
import classes from './ShoppingCart.module.css';
import EmptyCart from '../components/EmptyCart';

const ShoppingCart = (props) => {

    const isEmptyCart = props.cart.length === 0;

    const reduceQuantityHandler = () => {
        // to do 
    };

    const increaseQuantityHandler = () => {
        // to do 
    };

    let totalPrice = 0;
    for (const cartItem of props.cart) {
        totalPrice += +cartItem.price * cartItem.quantity;
    }

    const itemRows = props.cart.map((item) => {
        return (
            <tr>
                <td data-label="ITEM">
                    {item.name}
                </td>
                <td data-label="QTY">
                    <div className={classes.quantityControl}>
                    {/* <div> */}
                        <button className="ui compact icon button" onClick={reduceQuantityHandler}>
                            -
                        </button>
                        <div className={"ui mini icon input " + classes.divInput}>
                            <input type="number" disabled value={item.quantity} className={classes.shortInput} />
                        </div>
                        <button className="ui compact icon button" onClick={increaseQuantityHandler}>
                            +
                        </button>
                    </div>
                </td>
                <td data-label="PRICE">
                    ${item.price}
                </td>
            </tr>
        )
    });

    return (
        <Fragment>
            {isEmptyCart ? <EmptyCart /> :
                <div className="ui two column stackable grid container">
                    <div className="column">
                        <table className="ui striped table">
                            <thead>
                                <tr>
                                    <th className='ten wide'>ITEM</th>
                                    <th className='four wide'>QTY</th>
                                    <th className='two wide'>PRICE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemRows}
                                <tr>
                                    <td data-label="ITEM">
                                        TOTAL
                                    </td>
                                    <td data-label="QTY"></td>
                                    <td data-label="PRICE">
                                        ${totalPrice}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="column">
                        <form className="ui form">
                            <h1>Credit Card Information</h1>
                            <div className="field">
                                <label>Name on Card</label>
                                <input type="text" placeholder="Name on Card"/>
                            </div>
                            <div className="field">
                                <label>Zip</label>
                                <input type="text" placeholder="00000"/>
                            </div>
                            <div className="field">
                                <label>Credit Card Number</label>
                                <input type="text" placeholder="Credit Card Number"/>
                            </div>
                            <div className="field">
                                <label>CVV</label>
                                <input type="text" placeholder="CVV"/>
                            </div>
                            <button className="ui button" type="submit">Submit Order</button>
                        </form>
                    </div>
                </div>
            }
        </Fragment>
    );
};

export default ShoppingCart;