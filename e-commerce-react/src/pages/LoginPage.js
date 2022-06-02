import React from 'react';

import classes from './LoginPage.module.css';

// import ProductCard from '../components/ProductCard';

const LoginPage = (props) => {
    return (
        <div className={'ui container'}>
            <div className={classes.containerWidth}>
                <form className="ui form">
                    <div className="field">
                        <label>User Name</label>
                        <input type="text" placeholder="User Name" />
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input type="password" placeholder="Password" />
                    </div>
                    <button className="ui button" type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;