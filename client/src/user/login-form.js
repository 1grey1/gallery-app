// import {renderEffectsList} from '../effect-list.js';
import {createToken} from './user-api.js';
import {blockButton, unblockButton} from './util.js';

const loginFormElement = document.querySelector('#login-modal form');
const submitBtnElement = loginFormElement.querySelector('[type=submit]');

const setLoginFormSubmit = (onSuccess, onFail) => {
    loginFormElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const formData = new FormData(loginFormElement);

        blockButton(submitBtnElement, 'Вход');
        window.setTimeout(() => {
            createToken(formData, onSuccess, (errors, LOGIN_FIELDS, loginFormElement) => {
                onFail(errors, LOGIN_FIELDS, loginFormElement);
                unblockButton(submitBtnElement);
            });
        }, 2000);
    });

    // renderEffectsList();
}

export {setLoginFormSubmit};
