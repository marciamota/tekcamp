import React, { Fragment, useRef, useState, useContext } from 'react';
import classes from './ShoppingCart.module.css';
import EmptyCart from '../components/EmptyCart';
import CartSubmitted from '../components/CartSubmitted';
import AppContext from '../store/app-context';

const cardPattern = /^[0-9]{16}$/;
const zipPattern = /^[0-9]{5}$/;
const cvvPattern = /^[0-9]{3}$/;
const phonePattern = /^[0-9]{10}$/;
const priceFormater = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

const ShoppingCart = () => {
    const appCtx = useContext(AppContext);

    const nameRef = useRef("");
    const zipRef = useRef("");
    const cardNumberRef = useRef("");
    const cvvRef = useRef("");
    const [nameError, setNameError] = useState(false);
    const [zipError, setZipError] = useState(false);
    const [cardNumberError, setCardNumberError] = useState(false);
    const [cvvError, setCvvError] = useState(false);
    const [cartSubmitted, setCartSubmitted] = useState(false);

    const shippingNameRef = useRef("");
    const addressRef = useRef("");
    const cityRef = useRef("");
    const stateRef = useRef("");
    const shippingZipRef = useRef("");
    const phoneRef = useRef("");
    const [shippingNameError, setshippingNameError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [stateError, setStateError] = useState(false);
    const [shippingZipError, setShippingZipError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);


    const submitOrderHandler = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const zip = zipRef.current.value;
        const cardNumber = cardNumberRef.current.value;
        const cvv = cvvRef.current.value;
        const shippingName = shippingNameRef.current.value;
        const address = addressRef.current.value;
        const city = cityRef.current.value;
        const state = stateRef.current.value;
        const shippingZip = shippingZipRef.current.value;
        const phone = phoneRef.current.value;

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

        if (!shippingName || shippingName.length === 0) {
            setshippingNameError(true);
            errorsFound = true;
        } else {
            setshippingNameError(false);
        }

        if (!address || address.length === 0) {
            setAddressError(true);
            errorsFound = true;
        } else {
            setAddressError(false);
        }

        if (!city || city.length === 0) {
            setCityError(true);
            errorsFound = true;
        } else {
            setCityError(false);
        }

        if (!state || state.length === 0) {
            setStateError(true);
            errorsFound = true;
        } else {
            setStateError(false);
        }

        if (!shippingZip.match(zipPattern)) {
            setShippingZipError(true);
            errorsFound = true;
        } else {
            setShippingZipError(false);
        }

        if (!phone.match(phonePattern)) {
            setPhoneError(true);
            errorsFound = true;
        } else {
            setPhoneError(false);
        }

        if (!errorsFound) {
            setCartSubmitted(true);
            appCtx.clearCart([]);
        }
    };

    // make a copy of the cart
    const cartInfo = [...appCtx.cart];

    // complete cart info, add price and name
    for (let cartItem of cartInfo) {
        const itemInfo = appCtx.products.find((product) => product.id == cartItem.productId);
        if (itemInfo) {
            cartItem.name = itemInfo.title;
            cartItem.price = itemInfo.price;
            cartItem.available = itemInfo.available;
        }
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
        appCtx.updateCart(id, "decrement");
    };

    const increaseQuantityHandler = (id) => {
        appCtx.updateCart(id, "increment");
    };

    const itemRows = appCtx.cart.map((item) => {
        if (item.quantity == 0) {
            return null;
        }

        return (
            <tr key={item.productId}>
                <td data-label="ITEM">
                    {item.name}
                </td>
                <td data-label="QTY">
                    <div className={classes.quantityControl}>
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
                    {priceFormater.format(item.quantity * item.price)}
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
                                            {priceFormater.format(totalPrice)}
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
                                <hr />
                                <h1>Shipping Address</h1>
                                <div className="field">
                                    <label>Full Name</label>
                                    <input type="text" placeholder="Full Name" ref={shippingNameRef} />
                                    {shippingNameError && <p className={classes.errorMessage}>Enter a name</p>}
                                </div>
                                <div className="field">
                                    <label>Address</label>
                                    <input type="text" placeholder="Street Address" ref={addressRef} />
                                    {addressError && <p className={classes.errorMessage}>Enter an address</p>}
                                </div>
                                <div className="field">
                                    <label>City</label>
                                    <input type="text" placeholder="City" ref={cityRef} />
                                    {cityError && <p className={classes.errorMessage}>Enter a city</p>}
                                </div>
                                <div className="field">
                                    <label>State</label>
                                    <input type="text" placeholder="State" ref={stateRef} />
                                    {stateError && <p className={classes.errorMessage}>Enter a state</p>}
                                </div>
                                <div className="field">
                                    <label>Zip Code</label>
                                    <input type="text" placeholder="Zip Code" ref={shippingZipRef} />
                                    {shippingZipError && <p className={classes.errorMessage}>Enter a zip code</p>}
                                </div>
                                <div className="field">
                                    <label>Phone Number</label>
                                    <input type="text" placeholder="Phone Number" ref={phoneRef} />
                                    {phoneError && <p className={classes.errorMessage}>Enter a phone</p>}
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