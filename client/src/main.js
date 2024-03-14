import {setCommentFormSabmit} from './comment-form.js';
import {renderCommentList} from './comment-list.js';
import {setLikesCountClick, updateLikesCount} from './likes.js';
import {closeUploadModal} from './upload-modal.js';
import {setUploadFormSabmit} from './upload-form.js';
import {updatePicture} from './picture-list.js';
import {sortedPictureList} from './filters.js';
import {start, restart} from './start.js';
import {getData} from './api.js';
import {AppStorage, Url} from './const.js';
import {renderPicturesList} from './picture-list.js';
import './upload-modal.js';
import './user/main.js';

start();

getData(Url.PICTURE.GET, (response) => {
    sortedPictureList(JSON.parse(response));
});

setUploadFormSabmit(() => {
    closeUploadModal();
    getData(Url.PICTURE.GET, (response) => {
        renderPicturesList(JSON.parse(response), true);
    });
    // restart();
});

setCommentFormSabmit((pictureId) => {
    getData(Url.PICTURE.GET + `/${pictureId}`, (picture) => {
        localStorage.setItem(AppStorage.PICTURE, JSON.stringify(picture));
        updatePicture(picture);
        renderCommentList(picture.comments);
    }, true);
});

setLikesCountClick((pictureId) => {
    getData(Url.PICTURE.GET + `/${pictureId}`, (picture) => {
        localStorage.setItem(AppStorage.PICTURE, JSON.stringify(picture));
        updatePicture(picture);
        updateLikesCount(picture.likes);
    }, true);
});
