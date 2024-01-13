import {updatePageHeader} from './user/page-header.js';
import {getData} from './api.js';
import {Url, Storage} from './const.js';

const start = () => {
    updatePageHeader();
    getData(Url.EFFECT.GET, (response) => {
        const data = JSON.parse(response);
        localStorage.setItem(Storage.EFFECTS, JSON.stringify(data));
    });
}

export {start};
