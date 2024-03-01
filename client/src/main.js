import {setCommentFormSabmit} from './comment-form.js';
import {renderCommentList} from './comment-list.js';
import {setLikesCountClick, updateLikesCount} from './likes.js';
import {closeUploadModal} from './upload-modal.js';
import {setUploadFormSabmit} from './upload-form.js';
import {updatePicture} from './picture-list.js';
import {start, restart} from './start.js';
import {getData} from './api.js';
import {AppStorage, Url} from './const.js';
import './upload-modal.js';
import './user/main.js';

start();

setUploadFormSabmit(() => {
    closeUploadModal();
    // restart();
});

setCommentFormSabmit((pictureId) => {
    getData(Url.PICTURE.GET + `/${pictureId}`, (response) => {
        const picture = JSON.parse(response);
        updatePicture(picture);
        renderCommentList(picture.comments);
    });
});

setLikesCountClick(()=>{
    updateLikesCount(JSON.parse(localStorage.getItem(AppStorage.PICTURE)).likes);
});
