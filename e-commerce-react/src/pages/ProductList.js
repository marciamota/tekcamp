import React, { useContext } from 'react';

import classes from './ProductList.module.css';

import ProductCard from '../components/ProductCard';
import AppContext from '../store/app-context';

const ProductList = () => {
    const appCtx = useContext(AppContext);
    const productCards = appCtx.products.map(
        (singleProduct) => <ProductCard key={singleProduct.id} data={singleProduct}/>
    );

    return (
        <div className={'ui cards ' + classes.productrow}>
            {productCards}
        </div>
    );
};

export default ProductList;