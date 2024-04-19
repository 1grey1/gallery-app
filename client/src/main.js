import {setCommentFormSabmit} from './comment-form.js';
import {renderCommentList} from './comment-list.js';
import {setLikesCountClick, updateLikesCount} from './likes.js';
import {closeUploadModal} from './upload-modal.js';
import {setUploadFormSubmit} from './upload-form.js';
import {updatePicture} from './picture-list.js';
import {start, dontStart} from './start.js';
import {getData} from './api.js';
import {renderProgressBar} from "./message.js";
import {AppStorage, Url} from './const.js';
import {renderPicturesList, pictures} from './picture-list.js';
import {MessageType} from "./enum.js";
import './upload-modal.js';
import './user/main.js';

if (window.matchMedia("(min-width: 599px)").matches) {
    start();
} else {
    dontStart();
}

console.log(window.matchMedia("(min-width: 599px)").matches)
setUploadFormSubmit(() => {
    closeUploadModal();
    renderProgressBar(MessageType.SUCCESS, () => {
        getData(Url.PICTURE.GET, (response) => {
            renderPicturesList(JSON.parse(response), true);
        });
    });
});

setCommentFormSabmit((pictureId) => {
    getData(Url.PICTURE.GET + `/${pictureId}`, (picture) => {
        localStorage.setItem(AppStorage.PICTURE, JSON.stringify(picture));
        const indexPicture = pictures.indexOf(pictures.find((picture) => picture.id === pictureId));
        pictures.splice(indexPicture, 1, picture);
        updatePicture(picture);
        renderCommentList(picture.comments);
    }, true);
});

setLikesCountClick((pictureId) => {
    getData(Url.PICTURE.GET + `/${pictureId}`, (picture) => {
        localStorage.setItem(AppStorage.PICTURE, JSON.stringify(picture));
        const indexPicture = pictures.indexOf(pictures.find((picture) => picture.id === pictureId));
        pictures.splice(indexPicture, 1, picture);
        updatePicture(picture);
        updateLikesCount(picture.likes);
    }, true);
});
