import React from 'react';
import classes from './FetchDataError.module.css';

const FetchDataError = () => {
    return (
        <div className={classes.error}>
            <p>Fetching data failed, reload the page</p>
        </div>
    );
};

export default FetchDataError;