import React from 'react';
import axios from 'axios';
// import classes from './Loader.module.css';

const ProductList = () => {

    const getProducts = async () => {
        try {
          const response = await axios.get('https://dummyapi.io/data/v1/post?limit=15', {
            headers: {
              'app-id': '628c349e8a3a1d57ffc8437f'
            }
          })
          if (response && response.data && response.data.data) {
            // setPosts(response.data.data);
          } else {
            // setPostsError(true);
          }
        } catch (error) {
        //   setPostsError(true);
        } finally {
        //   setLoading(false);
        }
      }
    return (
        <div>
            Product List
        </div>
    );
};

export default ProductList;