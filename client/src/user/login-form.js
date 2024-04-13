import {createToken} from './user-api.js';
import {blockButton, unblockButton} from './util.js';

const loginFormElement = document.querySelector('#login-modal form');
const submitBtnElement = loginFormElement.querySelector('[type=submit]');

const setLoginFormSubmit = (onSuccess, onFail) => {
    loginFormElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const formData = new FormData(loginFormElement);

        blockButton(submitBtnElement, 'Entrance');
        window.setTimeout(() => {
            createToken(
                formData,
                (token) => {
                    onSuccess(token);
                    unblockButton(submitBtnElement);
                },
                (errors, LOGIN_FIELDS, loginFormElement) => {
                    onFail(errors, LOGIN_FIELDS, loginFormElement);
                    unblockButton(submitBtnElement);
                }
            );
        }, 2000);
    });
};

export {setLoginFormSubmit};
