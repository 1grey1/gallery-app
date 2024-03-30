import {createUser} from './user-api.js';
import {blockButton, unblockButton} from './util.js';

const signupFormElement = document.querySelector('#signup-modal form');
const submitBtnElement = signupFormElement.querySelector('[type=submit]');

const setSignupFormSubmit = (onSuccess, onFail) => {
    signupFormElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const formData = new FormData(signupFormElement);

        blockButton(submitBtnElement, 'Регистрация');
        window.setTimeout(() => {
            createUser(
                formData,
                () => {
                    onSuccess();
                    unblockButton(submitBtnElement);
                },
                (errors, SIGNUP_FIELDS, signupFormElement) => {
                    onFail(errors, SIGNUP_FIELDS, signupFormElement);
                    unblockButton(submitBtnElement);
                }
            );
        }, 2000);
    });
}

export {setSignupFormSubmit};
