import {renderPicturesList} from './picture-list.js';
import {setCommentFormSabmit} from './comment-form.js';
import {setLikesCountClick, updateLikesCount} from './likes.js';
import {closeUploadModal} from './upload-modal.js';
import {renderEffectsList} from './effect-list.js';
import {setUploadFormSabmit} from './upload-form.js';
import {Url} from './const.js';
import {start, restart} from './start.js';
import './upload-modal.js';
import './user/main.js';
import {getData} from './api.js';
import {AppStorage} from './const.js';

start();

getData(Url.PICTURE.GET, (response) => {
    const pictures = JSON.parse(response);
    renderPicturesList(pictures);
});

renderEffectsList();

setLikesCountClick(()=>{
    updateLikesCount(JSON.parse(localStorage.getItem(AppStorage.PICTURE)).likes);
});


setUploadFormSabmit(
    () => {
        closeUploadModal();
        // restart();
});

setCommentFormSabmit(() => {});
