import React from 'react';

const Profile = (props) => {
    // props will contain the user info
    return (
        <div>
            Profile
            {props.userData.firstName}
            {props.xxx}
        </div>
    );
};

export default Profile;