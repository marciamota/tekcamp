import React, { Fragment } from 'react';

import classes from './ProductList.module.css';

import ProductCard from '../components/ProductCard';

const ProductList = (props) => {

    const productCards = props.productList.map((singleProduct) => <ProductCard key={singleProduct.id} data={singleProduct} updateCart={props.updateCart}/>);

    return (
        <div className={'ui cards ' + classes.productrow}>
            {productCards}
        </div>
    );
};

export default ProductList;