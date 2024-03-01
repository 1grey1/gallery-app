import {updatePageHeader} from './user/page-header.js';
import {renderEffectsList} from './effect-list.js';
import {renderPicturesList} from './picture-list.js';
import {getData} from './api.js';
import {Url, AppStorage} from './const.js';

const start = () => {
    updatePageHeader();
    getData(Url.EFFECT.GET, (response) => {
        const data = JSON.parse(response);
        localStorage.setItem(AppStorage.EFFECTS, JSON.stringify(data));
        renderEffectsList();
    });

    getData(Url.PICTURE.GET, (response) => {
        renderPicturesList(JSON.parse(response));
    });
}

const restart = () => {

}

export {start,restart};
