import {renderCommentList} from './comment-list.js';
import {Url, AppStorage} from './const.js';
import {getUser} from './storage.js';
import {updateLikesCount} from './likes.js';
import {showPictureHastags} from './hashtag.js';
import {setImageEffect} from './effects.js';
import {getModalEscKeydownHandler, onModalOverlayClick} from "./modal-util";

const previewModalElement = document.querySelector('.big-picture');
const previewModalCloseElement = document.getElementById('picture-cancel');
const userAvatarElement = previewModalElement.querySelector('#comment-form .social__picture');
const previewAvatarElement = document.querySelector('.social__picture');
const previewModalImgElement = previewModalElement.querySelector('.big-picture__img img');
const totalCommentCountElement = previewModalElement.querySelector('.comments-count');
const previewModalDescElement = previewModalElement.querySelector('.social__caption');
const hashtagBtnElement = previewModalElement.querySelector('.hashtag-btn');

const onModalEscKeydown = getModalEscKeydownHandler(closePreviewModal);
const onOverlayClick = onModalOverlayClick(closePreviewModal, 'big-picture__preview');

const onHashtagBtnClick = () => {
    const {hashtags} = JSON.parse(localStorage.getItem(AppStorage.PICTURE));
    showPictureHastags(hashtags.map(hashtag => hashtag.name));
}

const openPreviewModal = (picture) => {
    localStorage.setItem(AppStorage.PICTURE, JSON.stringify(picture));
    setImageEffect(previewModalElement, picture);
    updateLikesCount(picture.likes);

    // previewModalImgElement.setAttribute('src', Url.UPLOAD.PICTURE + picture.url);
    previewModalImgElement.src = Url.UPLOAD.PICTURE + picture.url;
    totalCommentCountElement.textContent = picture.comments;
    previewModalDescElement.textContent = picture.description;

    previewAvatarElement.src = Url.UPLOAD.AVATAR + picture.user.avatar;
    userAvatarElement.src = Url.UPLOAD.AVATAR + getUser().avatar;
    renderCommentList(picture.comments);

    previewModalElement.classList.remove('hidden');
    previewModalCloseElement.addEventListener('click', closePreviewModal);
    previewModalElement.addEventListener('click', onOverlayClick);
    document.addEventListener('keydown', onModalEscKeydown);
    hashtagBtnElement.addEventListener('click', onHashtagBtnClick);
};

function closePreviewModal() {
    previewModalElement.classList.add('hidden');
    previewModalCloseElement.removeEventListener('click', closePreviewModal);
    previewModalElement.removeEventListener('click', onOverlayClick);
    document.removeEventListener('keydown', onModalEscKeydown);
    hashtagBtnElement.removeEventListener('click', onHashtagBtnClick);
}

export {openPreviewModal};
