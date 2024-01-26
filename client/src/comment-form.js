import {blockButton, unblockButton} from './user/util.js';
import {sendData} from './api.js';
import {AppStorage, Url} from './const.js';

const commentFormElement = document.querySelector('#comment-form');
const  submitBtnElement = commentFormElement.querySelector('[type=submit]');

const setCommentFormSabmit = (onSuccess, onFail) => {
    commentFormElement.addEventListener('submit', (evt) => {
        evt.preventDefault();

        if (!localStorage.getItem(AppStorage.ACCESS_TOKEN)) {
            return;
        }

        const {user} = JSON.parse(localStorage.getItem(AppStorage.ACCESS_TOKEN));

        const formData = new FormData(commentFormElement);
        formData.set('user_id', user.id);

        blockButton(submitBtnElement, 'Отправка');
        window.setTimeout(() => {
            sendData(
                Url.COMMENT.POST,
                () => {
                    unblockButton(submitBtnElement);
                    onSuccess();
                },
                () => {},
                formData
            );
        }, 2000);
        console.log(1);
    });
};

export {setCommentFormSabmit}
