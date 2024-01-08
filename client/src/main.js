import {updatePageHeader} from './user/page-header.js';
import {renderPicturesList} from './picture-list.js';
import {renderEffectsList} from './effect-list.js';
import {generatePictures} from './data.js';
import {getData} from './api.js';
import {Url} from './const.js';
import './upload-modal.js';
import './user/main.js';

updatePageHeader();

const pictures = generatePictures(54);
renderPicturesList(pictures);
renderEffectsList();

getData(Url.EFFECT.GET, (response) => {
    const data = JSON.parse(response);
    console.log(data)
});
