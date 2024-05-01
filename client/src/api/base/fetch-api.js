import {AppStorage} from "../../const";

const getToken = () => {
    if (!localStorage.getItem(AppStorage.ACCESS_TOKEN)){
        return;
    }

    return JSON.parse(localStorage.getItem(AppStorage.ACCESS_TOKEN)).token;
}

const getData = (url) => {
    const token = getToken();
    let responseOk;
    let responseStatus;

    return fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Basic ${btoa(token + ':')}`
        }
    })
        .then((response) => {
            responseOk = response.ok;
            responseStatus = response.status;
            return response.json();
        })
        .then((data) => {
            return {
                data: responseOk ? data : null,
                status: responseStatus,
                errors: null
            };
        });
};

const sendData = (url, body) => {
    const token = getToken();
    let respons;
    let responseStatus;

    return fetch(url, {
        method: 'POST',
        body,
        headers: {
            Authorization: `Basic ${btoa(token + ':')}`
        }
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
                errors: respons.ok ? null : JSON.parse(respons.headers.get('error'))
            };
        });
};

const deleteData = (url) => {
    const token = getToken();
    let respons;
    let responseStatus;

    return fetch(url, {
        method: 'DELETE',
        headers: {
            Authorization: `Basic ${btoa(token + ':')}`
        }
    })
        .then((response) => {
            respons = response;
            responseStatus = response.status;
            return response;
        })
        .then((data) => {
            return {
                data: respons.ok ? data : null,
                status: responseStatus,
                errors: null
            };
        });
}

export {
    getData,
    sendData,
    deleteData
};
