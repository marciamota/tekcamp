import React, { useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../store/app-context';
import Message from '../components/Message'

const ProductDetail = () => {
    const appCtx = useContext(AppContext);
    const Params = useParams();
    const id = Params.id;

    const product = appCtx.originalProducts.find((singleProduct) => +singleProduct.id === +id);

    const addToCartHandler = () => {
        appCtx.updateCart(id, "increment");
    };

    return (
        <Fragment>
            {!product ? <Message message="product-not-found"/> :
                <div className="ui two column stackable grid container">
                    <div className="column">
                        <img alt="product" className="ui fluid image" src={product.image} />
                    </div>
                    <div className="column">
                        <h3><span className="text-secondary">Product's </span>Details</h3>
                        <h4>
                            Descriptions:
                        </h4>
                        <p>Product name: {product.title}</p>
                        <p>Price: ${product.price}</p>
                        <p>Category: {product.category}</p>
                        <p>Serial Number: {product.serial_number}</p>
                        <p>Manufacturer: {product.manufacturer}</p>
                        <p>Available: {product.available}</p>
                        <button
                            className="ui basic button"
                            onClick={addToCartHandler}
                            disabled={product.available < 1}
                        >
                            <i className="shopping cart icon"></i>
                            {product.available < 1 ? "Sold out" : "Add to cart"}
                        </button>
                    </div>
                </div>
            }
        </Fragment>

    );
};

export default ProductDetail;