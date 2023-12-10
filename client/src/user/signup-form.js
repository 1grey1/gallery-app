import {createUser} from './user-api.js';

const signupFormElement = document.querySelector('#signup-modal form');

const setSignupFormSubmit = (onSuccess, onFail) => {
    signupFormElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const formData = new FormData(signupFormElement);
        createUser(formData, onSuccess, onFail);
    });
}

export {setSignupFormSubmit};
