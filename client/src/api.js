import {AppStorage} from './const.js';

const getToken = () => {
    if (!localStorage.getItem(AppStorage.ACCESS_TOKEN)){
        return;
    }

    return JSON.parse(localStorage.getItem(AppStorage.ACCESS_TOKEN)).token;
}

const getData = (url, onSuccess, onFail) => {
    const token = getToken();

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
    console.log(xhr.status);
    // FIXME:
    if (xhr.status === 0) { 
        onSuccess();
    } else {
        onFail();
    }

    xhr.send();
}

export {
    getData,
    sendData,
    deleteData
};
