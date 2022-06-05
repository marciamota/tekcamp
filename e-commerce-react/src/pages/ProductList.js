import React, { Fragment, useContext } from 'react';

import classes from './ProductList.module.css';

import ProductCard from '../components/ProductCard';
import AppContext from '../store/app-context';

const ProductList = (props) => {
    const appCtx = useContext(AppContext);

    // const productCards = props.productList.map((singleProduct) => <ProductCard key={singleProduct.id} data={singleProduct} updateCart={props.updateCart}/>);
    const productCards = appCtx.products.map((singleProduct) => <ProductCard key={singleProduct.id} data={singleProduct} updateCart={props.updateCart}/>);

    return (
        <div className={'ui cards ' + classes.productrow}>
            {productCards}
        </div>
    );
};

export default ProductList;