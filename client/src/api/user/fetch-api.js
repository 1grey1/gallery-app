import {Url} from '../../const.js';

const signupFormElement = document.querySelector('#signup-modal form');
const loginFormElement = document.querySelector('#login-modal form');

const SIGNUP_FIELDS = ['email', 'password_hash', 'username', 'avatar'];
const LOGIN_FIELDS = ['email', 'password'];

const createUser = (body, onFail) => {
    let respons;
    let responseStatus;

    return fetch(Url.USER.POST, {
        method: 'POST',
        body
    })
        .then((response) => {
            respons = response;
            responseStatus = response.status;
            return response.json();
        })
        .then((data) => {
            return {
                data: respons.ok ? data : null,
                status: responseStatus,
                errors: respons.ok ? null : () => {
                    const errors = JSON.parse(data);
                    onFail(errors, SIGNUP_FIELDS, signupFormElement);
                }
            };
        });
};

export {createUser};