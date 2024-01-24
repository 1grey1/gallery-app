import {updatePageHeader} from './user/page-header.js';
import {getData} from './api.js';
import {Url, AppStorage} from './const.js';

const start = () => {
    updatePageHeader();
    getData(Url.EFFECT.GET, (response) => {
        const data = JSON.parse(response);
        localStorage.setItem(AppStorage.EFFECTS, JSON.stringify(data));
    });
}

const testart = () => {

}

export {start};
