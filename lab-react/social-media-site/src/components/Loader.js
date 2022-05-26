import React from 'react';
import classes from './Loader.module.css';

const Loader = () => {
    return (
        <div>
            <div className="ui segment" className={classes.customLoader}>
                <div className="ui active inverted dimmer">
                    <div className="ui large text loader">Loading</div>
                </div>
            </div>
        </div>

    );
};

export default Loader;