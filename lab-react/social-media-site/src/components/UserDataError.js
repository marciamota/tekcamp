import React from 'react';

const UserDataError = (props) => {
    // props will contain the user info
    return (
        <div>
            <p>Fetching user data failed, reload the page</p>
        </div>
    );
};

export default UserDataError;