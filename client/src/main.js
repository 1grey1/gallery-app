import {setCommentFormSabmit} from './comment-form.js';
import {renderCommentList} from './comment-list.js';
import {setLikesCountClick, updateLikesCount} from './likes.js';
import {closeUploadModal} from './upload-modal.js';
import {setUploadFormSubmit} from './upload-form.js';
import {updatePicture} from './picture-list.js';
import {start} from './start.js';
import {getData} from './api/base/fetch-api.js';
import {renderProgressBar} from "./message.js";
import {AppStorage, Url} from './const.js';
import {renderPicturesList, pictures} from './picture-list.js';
import {MessageType} from "./enum.js";
import './upload-modal.js';
import './user/main.js';

start();

setUploadFormSubmit(() => {
    closeUploadModal();
    renderProgressBar(MessageType.SUCCESS, () => {
        getData(Url.PICTURE.GET)
            .then((picture) => {
                const data = picture.data;
                renderPicturesList(data, true);
            });
    });
});

setCommentFormSabmit((pictureId) => {
    getData(Url.PICTURE.GET + `/${pictureId}`)
        .then((picture) => {
            const data = picture.data;
            localStorage.setItem(AppStorage.PICTURE, JSON.stringify(data));
            const indexPicture = pictures.indexOf(pictures.find((picture) => picture.id === pictureId));
            pictures.splice(indexPicture, 1, data);
            updatePicture(data);
            renderCommentList(data.comments);
        });
});

setLikesCountClick((pictureId) => {
    getData(Url.PICTURE.GET + `/${pictureId}`)
        .then((picture) => {
            const data = picture.data;
            localStorage.setItem(AppStorage.PICTURE, JSON.stringify(data));
            const indexPicture = pictures.indexOf(pictures.find((picture) => picture.id === pictureId));
            pictures.splice(indexPicture, 1, data);
            updatePicture(data);
            updateLikesCount(data.likes);
        });
});
