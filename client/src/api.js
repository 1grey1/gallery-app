import {Storage} from './const.js';

const getData = (url, onSuccess) => {
    if (!localStorage.getItem(Storage.ACCESS_TOKEN)){
        return;
    }

    const {token} = JSON.parse(localStorage.getItem(Storage.ACCESS_TOKEN));

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('Authorization', `Basic ${btoa(token + ':')}`);

    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            onSuccess(xhr.response);
        }
    });

    xhr.send();
}

export {getData};
