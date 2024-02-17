import {renderPicturesList} from './picture-list.js';
import {setCommentFormSabmit} from './comment-form.js';
import {renderCommentList} from './comment-list.js';
import {setLikesCountClick, updateLikesCount} from './likes.js';
import {closeUploadModal} from './upload-modal.js';
import {renderEffectsList} from './effect-list.js';
import {setUploadFormSabmit} from './upload-form.js';
import {start, restart} from './start.js';
import './upload-modal.js';
import './user/main.js';
import {getData} from './api.js';
import {AppStorage, Url} from './const.js';

const textWindow = document.querySelector('.social__footer-text');

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

setCommentFormSabmit(() => {
    const pictureId = JSON.parse(localStorage.getItem(AppStorage.PICTURE)).id;
    getData(Url.PICTURE.GET, (response) => {
        const pictures = JSON.parse(response);
        renderCommentList(pictures.find(picture => picture.id === pictureId).comments);
        textWindow.value = '';
        // document.querySelector('.pictures').remove();
        // renderPicturesList(pictures);
    });
});
