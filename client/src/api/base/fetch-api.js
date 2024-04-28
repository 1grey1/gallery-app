import {AppStorage} from "../../const";

const getToken = () => {
    if (!localStorage.getItem(AppStorage.ACCESS_TOKEN)){
        return;
    }

    return JSON.parse(localStorage.getItem(AppStorage.ACCESS_TOKEN)).token;
}

const getData = (url, parse = false) => {
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
}

export {getData};
