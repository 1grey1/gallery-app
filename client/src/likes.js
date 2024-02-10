import {blockButton, unblockButton} from './user/util.js';
import {sendData, deleteData} from './api.js';
import {AppStorage, Url} from './const.js';

const  submitBtnElement = document.querySelector('.likes-count');
const previewModalLikesElement = document.querySelector('.likes-count');

const getLike = (likes, user_id) => likes.find((like) => like.user_id == user_id);

const updateLikesCount = (likes) => {
    previewModalLikesElement.textContent = likes.length;
    const {user} = JSON.parse(localStorage.getItem(AppStorage.ACCESS_TOKEN));

    if (getLike(likes, user.id)) {
        submitBtnElement.classList.add('likes-count--active');
    } else {
        submitBtnElement.classList.remove('likes-count--active');
    }
}

const setLike = (onSuccess, userId, pictureId) => {
    const formData = new FormData();
    formData.set('user_id', userId);
    formData.set('picture_id', pictureId);

    blockButton(submitBtnElement);
    window.setTimeout(() => {
        sendData(
            Url.LIKE.POST,
            () => {
                unblockButton(submitBtnElement);
                onSuccess();
            },
            () => {
                unblockButton(submitBtnElement);
            },
            formData
        );
    }, 500);
}

const removeLike = (onSuccess, likeId) => {
    blockButton(submitBtnElement);
    window.setTimeout(() => {
        deleteData(
            Url.LIKE.DELETE + likeId,
            () => {
                unblockButton(submitBtnElement);
                onSuccess();
            },
            () => {
                unblockButton(submitBtnElement);
            }
        )
    }, 500)
}

const setLikesCountClick = (onSuccess) => {
    submitBtnElement.addEventListener('click', (evt) => {
        evt.preventDefault();
        if (!localStorage.getItem(AppStorage.ACCESS_TOKEN)) {
            return;
        }

        const {user} = JSON.parse(localStorage.getItem(AppStorage.ACCESS_TOKEN));
        const picture = JSON.parse(localStorage.getItem(AppStorage.PICTURE));

        if (getLike(picture.likes, user.id)) {
            const likeId = picture.likes.find(like => like.user_id === user.id).id;
            const cb = () => console.log(picture.likes.find(x => x.user_id === user.id).id);
            removeLike(
                () => {
                    cb();
                    onSuccess();
                },
                likeId
            );
        } else {
            setLike(onSuccess, user.id, picture.id);
        }

    });

};


export {
    setLikesCountClick,
    updateLikesCount
};