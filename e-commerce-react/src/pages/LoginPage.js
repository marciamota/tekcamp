import React, { useRef, useState } from 'react';

import classes from './LoginPage.module.css';

// hardcoding administrator user credentials to simulate admin authorization
const adminUser = "admin";
const adminPassword = "admin";

// import ProductCard from '../components/ProductCard';

const LoginPage = (props) => {
    const nameRef = useRef("");
    const passwordRef = useRef("");
    const [nameError, setNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const loginHandler = (e) => {
        e.preventDefault();
        let errorsFound = false;
        setNameError(false);
        setPasswordError(false);
        if (nameRef.current.value.length === 0) {
            setNameError(true);
            errorsFound = true;
        };
        if (passwordRef.current.value.length === 0) {
            setPasswordError(true);
            errorsFound = true;
        };
        if (!errorsFound) {
            props.setUser(nameRef.current.value);
            props.setIsAdmin(nameRef.current.value == adminUser && passwordRef.current.value == adminPassword);
        };
        sessionStorage.setItem("user", nameRef.current.value);
        sessionStorage.setItem("isAdmin", (nameRef.current.value == adminUser && passwordRef.current.value == adminPassword));
    }; 

    return (
        <div className={'ui container'}>
            <div className={classes.containerWidth}>
                <form className="ui form" onSubmit={loginHandler}>
                    <div className="field">
                        <label>User Name</label>
                        <input type="text" placeholder="User Name" ref={nameRef}/>
                        {nameError && <p className={classes.errorMessage}>Enter a name</p>}
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input type="password" placeholder="Password" ref={passwordRef} />
                        {passwordError && <p className={classes.errorMessage}>Enter a password</p>}
                    </div>
                    <button className="ui button" type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
