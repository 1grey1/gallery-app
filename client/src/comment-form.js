import {blockButton, unblockButton} from './user/util.js';
import {sendData} from './api/base/fetch-api.js';
import {AppStorage, Url} from './const.js';

const commentFormElement = document.querySelector('#comment-form');
const submitBtnElement = commentFormElement.querySelector('[type=submit]');
const commentInputElement = commentFormElement.querySelector('.social__footer-text');

const setCommentFormSabmit = (onSuccess, onFail) => {
    commentFormElement.addEventListener('submit', (evt) => {
        evt.preventDefault();

        if (!localStorage.getItem(AppStorage.ACCESS_TOKEN)) {
            return;
        }

        const {user} = JSON.parse(localStorage.getItem(AppStorage.ACCESS_TOKEN));
        const picture = JSON.parse(localStorage.getItem(AppStorage.PICTURE));

        const formData = new FormData(commentFormElement);
        formData.set('user_id', user.id);
        formData.set('picture_id', picture.id);

        blockButton(submitBtnElement, 'Отправка');
        window.setTimeout(() => {
            sendData(Url.COMMENT.POST, formData)
                .then(() => {
                    onSuccess(picture.id);
                    commentInputElement.value = '';
                    unblockButton(submitBtnElement);
                })
                .catch(() => {
                    onFail();
                });
        }, 500);
    });
};

export {setCommentFormSabmit}
