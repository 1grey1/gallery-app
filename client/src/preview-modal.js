import {renderCommentList} from './comment-list.js';

const previewModalElement = document.querySelector('.big-picture');
const previewModalCloseElement = document.getElementById('picture-cancel')
const previewModalImgElement = previewModalElement.querySelector('.big-picture__img img');
const previewModalLikesElement = previewModalElement.querySelector('.likes-count');
const totalCommentCountElement = previewModalElement.querySelector('.comments-count');
const previewModalDescElement = previewModalElement.querySelector('.social__caption');

const onModalEscKeydown = (evt) => {
    if (evt.code === 'Escape') {
        closePreviewModal();
    }
};

const openPreviewModal = (picture) => {
    previewModalImgElement.setAttribute('src', `http://localhost:80/uploads/pictures/${picture.url}`);
    previewModalLikesElement.textContent = picture.likes;
    totalCommentCountElement.textContent = picture.comments.length;
    previewModalDescElement.textContent = picture.description;
    renderCommentList(picture.comments);

    previewModalElement.classList.remove('hidden');

    previewModalCloseElement.addEventListener('click', closePreviewModal)
    document.addEventListener('keydown', onModalEscKeydown);
};

const closePreviewModal = () => {
    previewModalElement.classList.add('hidden');
    previewModalCloseElement.removeEventListener('click', closePreviewModal);
    document.removeEventListener('keydown', onModalEscKeydown);
}

export {openPreviewModal};
