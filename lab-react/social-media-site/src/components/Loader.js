import React from 'react';
import classes from './Loader.module.css';

const Loader = () => {
    return (
        <div>
            <div class="ui segment" className={classes.customLoader}>
                <div class="ui active inverted dimmer">
                    <div class="ui large text loader">Loading</div>
                </div>
            </div>
        </div>

    );
};

export default Loader;