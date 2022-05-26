import React from 'react';
import classes from './Profile.module.css';

const Profile = (props) => {
    // props will contain the user info
    const data = props.userData;

    return (
        <div className={classes.profile}>
            <div>
                <h2>Name: {data.firstName} {data.lastName}.</h2>
                <h3>Gender: {data.gender}.</h3>
                <h3>Birthdate: {new Date(data.dateOfBirth).toDateString()}.</h3>
                <h3>Location: {data.city}, {data.state}, {data.country}.</h3>
            </div>
        </div>
    );
};

export default Profile;