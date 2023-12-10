const signupFormElement = document.querySelector('#signup-modal form');
const SIGNUP_FIELDS = ['email', 'password_hash', 'username', 'avatar'];

const createUser = (body, onSuccess, onFail) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:80/user');

    xhr.addEventListener('load', () => {
        if (xhr.status === 201) {
            onSuccess();
        } else {
            const errors = JSON.parse(xhr.response);
            onFail(errors, SIGNUP_FIELDS, signupFormElement);
        }
    });

    xhr.send(body);
}

export {createUser};
