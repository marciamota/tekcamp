import React from 'react';
import { useParams } from 'react-router-dom';
// import classes from './Loader.module.css';

const ProductDetail = () => {
    const Params = useParams();
    const id = Params.id;
    return (
        <div>
            Product Detail {id}
        </div>
    );
};

export default ProductDetail;