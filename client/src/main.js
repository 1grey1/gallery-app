import {renderPicturesList} from './picture-list.js';
import {setCommentFormSabmit} from './comment-form.js';
import {closeUploadModal} from './upload-modal.js';
import {renderEffectsList} from './effect-list.js';
import {setUploadFormSabmit} from './upload-form.js';
import {Url} from './const.js';
import {start, restart} from './start.js';
import './upload-modal.js';
import './user/main.js';
import {getData} from './api.js';

start();

getData(Url.PICTURE.GET, (response) => {
    const pictures = JSON.parse(response);
    renderPicturesList(pictures);
});

renderEffectsList();

setUploadFormSabmit(
    () => {
        closeUploadModal();
        // restart();
});

setCommentFormSabmit(() => {});
