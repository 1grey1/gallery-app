import {updatePageHeader} from './user/page-header.js';
import {renderEffectsList} from './effect-list.js';
import {renderPicturesList} from './picture-list.js';
import {Url, AppStorage} from './const.js';
import {setFilterBtnClick} from "./filters";
import {checkMobileVersion} from "./util";
import {getData} from "./api/base/fetch-api";

const BLOCK_MESSAGE = 'Login from the computer version!';

const start = () => {
    if (checkMobileVersion()) {
        document.body.innerHTML = '';
        window.setTimeout(() => {
            alert(BLOCK_MESSAGE);
        },0);
        return;
    }
    if (updatePageHeader()) {
    getData(Url.EFFECT.GET)
        .then((effects) => {
            const data = effects.data;
            localStorage.setItem(AppStorage.EFFECTS, JSON.stringify(data));
            renderEffectsList();
            console.log(effects);
        });

    getData(Url.PICTURE.GET)
        .then((pictures) => {
            const data = pictures.data;
            renderPicturesList(data);
            setFilterBtnClick();
        });
    document.querySelector('.img-upload__label').style.opacity = '1';
    }
}

export {start};
