import {AppStorage} from './const.js';

const getToken = () => {
    if (!localStorage.getItem(AppStorage.ACCESS_TOKEN)){
        return;
    }

    return JSON.parse(localStorage.getItem(AppStorage.ACCESS_TOKEN)).token;
}

const getData = (url, onSuccess, parse = false) => {
    const token = getToken();

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('Authorization', `Basic ${btoa(token + ':')}`);

    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            const response = parse ? JSON.parse(xhr.response) : xhr.response;
            onSuccess(response);
        }
    });

    xhr.send();
}

const sendData = (url, onSuccess, onFail, body) => {
    const token = getToken();

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Authorization', `Basic ${btoa(token + ':')}`);

    xhr.addEventListener('load', () => {
        if (xhr.status === 201) {
            onSuccess();
        } else {
            onFail();
        }
    });

    xhr.send(body);
}

const deleteData = (url, onSuccess, onFail) => {
    const token = getToken();

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', url);
    xhr.setRequestHeader('Authorization', `Basic ${btoa(token + ':')}`);
    xhr.addEventListener('load', () => {
        if ([0, 204].includes(xhr.status)) { 
            onSuccess();
        } else {
            onFail();
        }
    });

    xhr.send();
}

export {
    getData,
    sendData,
    deleteData
};
