import {updatePageHeader} from './user/page-header.js';
import {renderEffectsList} from './effect-list.js';
import {renderPicturesList} from './picture-list.js';
import {getData} from './api.js';
import {Url, AppStorage} from './const.js';
import {setFilterBtnClick} from "./filters";

const start = () => {
    if (updatePageHeader()) {
        getData(Url.EFFECT.GET, (response) => {
            const data = JSON.parse(response);
            localStorage.setItem(AppStorage.EFFECTS, JSON.stringify(data));
            renderEffectsList();
        });

        getData(Url.PICTURE.GET, (response) => {
            renderPicturesList(JSON.parse(response));
            setFilterBtnClick();
        });

        document.querySelector('.img-upload__label').style.opacity = 1;
    }
}

export {start};
