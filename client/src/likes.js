import {blockButton, unblockButton} from './user/util.js';
import {sendData, deleteData} from './api.js';
import {AppStorage, Url} from './const.js';
import {getCurrentPicture} from './storage.js';

const submitBtnElement = document.querySelector('.likes-count');
const previewModalLikesElement = document.querySelector('.likes-count');

const getLike = (likes, userId, pictureId) => {

    return likes.find((like) => {
        return like.user_id == userId && like.picture_id == pictureId;
    })
};

const updateLikesCount = (likes) => {
    previewModalLikesElement.textContent = likes.length;
    const picture = JSON.parse(localStorage.getItem('gallery_cGljdHVyZQ=='));
    const {user} = JSON.parse(localStorage.getItem(AppStorage.ACCESS_TOKEN));

    if (getLike(picture.likes, user.id, picture.id)) {
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
                onSuccess();
                unblockButton(submitBtnElement);
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
                onSuccess();
                unblockButton(submitBtnElement);
            },
            () => {
                console.log(3);
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

        if (getLike(picture.likes, user.id, picture.id)) {
            const likeId = picture.likes.find(like => like.user_id === user.id).id;
            removeLike(
                () => {
                    onSuccess(picture.id);
                },
                likeId
            );
        } else {
            setLike(
                () => {
                    onSuccess(picture.id);
                },
                user.id,
                picture.id
            );
        }
    });

};


export {
    setLikesCountClick,
    updateLikesCount
};