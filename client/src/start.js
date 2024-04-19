import {updatePageHeader} from './user/page-header.js';
import {renderEffectsList} from './effect-list.js';
import {renderPicturesList} from './picture-list.js';
import {getData} from './api.js';
import {Url, AppStorage} from './const.js';
import {setFilterBtnClick} from "./filters";

const guestMenu = document.getElementById('guest-menu');
const mainHider = document.querySelector('.main-header-nav');
const hiderElement =document.querySelector('.container');
const main = document.querySelector('main');

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

        document.querySelector('.img-upload__label').style.opacity = '1';
    }
}

const dontStart = () => {
    guestMenu.remove();
    mainHider.style.justifyContent = 'center';
    hiderElement.style.width = 'auto';
    document.querySelector('.img-upload').remove();
    main.textContent = 'Зайди с компьюторной версии!!!';
    main.style = 'display: flex; justify-content: center; align-items: center; height: 700px; color: rgba(238, 210, 30, 1); font-size: 20px'
}

export {
    start,
    dontStart
};
