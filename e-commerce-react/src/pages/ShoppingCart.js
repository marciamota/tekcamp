import React, { Fragment, useRef, useState } from 'react';
import classes from './ShoppingCart.module.css';
import EmptyCart from '../components/EmptyCart';
import CartSubmitted from '../components/CartSubmitted';

const cardPattern = /^[0-9]{16}$/;
const zipPattern = /^[0-9]{5}$/;
const cvvPattern = /^[0-9]{3}$/;

const ShoppingCart = (props) => {
    const nameRef = useRef("");
    const zipRef = useRef("");
    const cardNumberRef = useRef("");
    const cvvRef = useRef("");
    const [nameError, setNameError] = useState(false);
    const [zipError, setZipError] = useState(false);
    const [cardNumberError, setCardNumberError] = useState(false);
    const [cvvError, setCvvError] = useState(false);
    const [cartSubmitted, setCartSubmitted] = useState(false);


    const submitOrderHandler = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const zip = zipRef.current.value;
        const cardNumber = cardNumberRef.current.value;
        const cvv = cvvRef.current.value;
        let errorsFound = false;

        if (!name || name.length === 0) {
            setNameError(true);
            errorsFound = true;
        } else {
            setNameError(false);
        }

        if (!zip.match(zipPattern)) {
            setZipError(true);
            errorsFound = true;
        } else {
            setZipError(false);
        }

        if (!cardNumber.match(cardPattern)) {
            setCardNumberError(true);
            errorsFound = true;
        } else {
            setCardNumberError(false);
        }

        if (!cvv.match(cvvPattern)) {
            setCvvError(true);
            errorsFound = true;
        } else {
            setCvvError(false);
        }

        if (!errorsFound) {
            console.log("order submitted", name, zip, cardNumber, cvv);
            setCartSubmitted(true);
            props.clearCart([]);
        }
    };

    // make a copy of the cart
    const cartInfo = [...props.cart];

    // complete cart info, add price and name
    for (let cartItem of cartInfo) {
        const itemInfo = props.productList.find((product) => product.id == cartItem.productId);
        cartItem.name = itemInfo.title;
        cartItem.price = itemInfo.price;
        cartItem.available = itemInfo.available;
    };

    // calculate total price
    let totalPrice = 0;
    let totalItems = 0;
    for (const cartItem of cartInfo) {
        totalPrice += +cartItem.price * cartItem.quantity;
        totalItems += cartItem.quantity;
    }

    const isEmptyCart = totalItems === 0;

    const reduceQuantityHandler = (id) => {
        props.updateCart(id, "decrement");
    };

    const increaseQuantityHandler = (id) => {
        props.updateCart(id, "increment");
    };

    const itemRows = props.cart.map((item) => {
        if (item.quantity == 0) {
            return;
        }

        return (
            <tr key={item.productId}>
                <td data-label="ITEM">
                    {item.name}
                </td>
                <td data-label="QTY">
                    <div className={classes.quantityControl}>
                        {/* <div> */}
                        <button
                            className="ui compact icon button"
                            onClick={() => (reduceQuantityHandler(item.productId))}>
                            -
                        </button>
                        <div className={"ui mini icon input " + classes.divInput}>
                            <input type="number" disabled value={item.quantity} className={classes.shortInput} />
                        </div>
                        <button
                            className="ui compact icon button"
                            onClick={() => (increaseQuantityHandler(item.productId))}
                            disabled={item.available < 1}>
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
            {cartSubmitted ? <CartSubmitted /> :
                isEmptyCart ? <EmptyCart /> :
                    <div className="ui two column stackable grid container">
                        <div className="column">
                            <table className="ui striped table">
                                <thead>
                                    <tr key="header">
                                        <th className='ten wide'>ITEM</th>
                                        <th className='four wide'>QTY</th>
                                        <th className='two wide'>PRICE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {itemRows}
                                    <tr key="total">
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
                            <form className="ui form" onSubmit={submitOrderHandler}>
                                <h1>Credit Card Information</h1>
                                <div className="field">
                                    <label>Name on Card</label>
                                    <input type="text" placeholder="Name on Card" ref={nameRef} />
                                    {nameError && <p className={classes.errorMessage}>Enter a name</p>}
                                </div>
                                <div className="field">
                                    <label>Zip</label>
                                    <input type="text" placeholder="00000" ref={zipRef} />
                                    {zipError && <p className={classes.errorMessage}>Enter a valid zip</p>}
                                </div>
                                <div className="field">
                                    <label>Credit Card Number</label>
                                    <input type="text" placeholder="Credit Card Number" ref={cardNumberRef} />
                                    {cardNumberError && <p className={classes.errorMessage}>Enter a valid credit card</p>}
                                </div>
                                <div className="field">
                                    <label>CVV</label>
                                    <input type="text" placeholder="CVV" ref={cvvRef} />
                                    {cvvError && <p className={classes.errorMessage}>Enter a valid cvv</p>}
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