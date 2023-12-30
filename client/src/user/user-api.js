import {Url} from '../const.js';

const signupFormElement = document.querySelector('#signup-modal form');
const loginFormElement = document.querySelector('#login-modal form');

const SIGNUP_FIELDS = ['email', 'password_hash', 'username', 'avatar'];
const LOGIN_FIELDS = ['email', 'password'];

const createUser = (body, onSuccess, onFail) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', Url.USER.POST);

    xhr.addEventListener('load', () => {
        if (xhr.status === 201) {
            onSuccess();
        } else {
            const errors = JSON.parse(xhr.response);
            onFail(errors, SIGNUP_FIELDS, signupFormElement);
            console.log(errors);
        }
    });

    xhr.send(body);
}

const createToken = (body, onSuccess, onFail) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', Url.ACCESS_TOKEN.POST);

    xhr.addEventListener('load', () => {
        if (xhr.status === 201) {
            const token = JSON.parse(xhr.response);
            onSuccess(token);
        } else {
            const errors = [];
            const response = JSON.parse(xhr.getResponseHeader('Errors'));

            for (const key in response) {
                errors.push({
                    field: key,
                    message: response[key][0]
                });
            }

            onFail(errors, LOGIN_FIELDS, loginFormElement);
        }
    })

    xhr.send(body);
}

const deleteToken = (token, tokenId, onSuccess) => {
    // xhr.setRequestHeader('Authorization', `Basic ${btoa(token + ':')}`); сдулать это сразу послу const xhr = new XMLHttpRequest();
    // статус в случае успеха === 204
    // метод будет DELETE
}

export {createUser, createToken};
