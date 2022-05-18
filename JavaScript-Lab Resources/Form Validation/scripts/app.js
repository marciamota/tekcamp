const form = document.querySelector('#form');

const fieldInputUserName = document.querySelector('#first-name');
const fieldInputLastName = document.querySelector('#last-name');
const fieldInputEmail = document.querySelector('#email');
const fieldInputPwd = document.querySelector('#password');

//clear error messages and restore original email error text
clearErrors = () => {
    fieldInputUserName.nextElementSibling.removeAttribute('style');
    fieldInputLastName.nextElementSibling.removeAttribute('style');
    fieldInputEmail.nextElementSibling.removeAttribute('style');
    fieldInputPwd.nextElementSibling.removeAttribute('style');
    fieldInputEmail.nextElementSibling.textContent = 'Email cannot be empty';
}

//Validate email
isEmailValid = (email) => {
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return email.match(emailPattern);
}

validateFormData = (e) => {
    // I am not really submitting data to a backend
    e.preventDefault();
    clearErrors();
    // grab the value of each input
    const firstName = fieldInputUserName.value;
    const lastName = fieldInputLastName.value;
    const email = fieldInputEmail.value;
    const password = fieldInputPwd.value;
    // check first name
    if (firstName === '') {
        // if first name empty then unset the css attribute visibility
        fieldInputUserName.nextElementSibling.setAttribute('style', 'visibility:unset;');
    }
    // check last name
    if (lastName === '') {
        // if last name empty then unset the css attribute visibility
        fieldInputLastName.nextElementSibling.setAttribute('style', 'visibility:unset;');
    }
    // check email
    if (email === '') {
        // if email empty then unset the css attribute visibility
        fieldInputEmail.nextElementSibling.setAttribute('style', 'visibility:unset');
    } else if (!isEmailValid(email)) {
        // if not valid email format then unset the css attribute visibility
        // and change the error message text
        fieldInputEmail.nextElementSibling.textContent = 'Looks like this is not a valid email';
        fieldInputEmail.nextElementSibling.setAttribute('style', 'visibility:unset');
    }
    // check password
    if (password === '') {
        // if password empty then unset the css attribute visibility
        fieldInputPwd.nextElementSibling.setAttribute('style', 'visibility:unset;');
    }
};

// assign click listener to form, the click listener will execute certain function
form.addEventListener('submit', validateFormData);
