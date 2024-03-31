import {Url} from "./const.js";
import {openPreviewModal} from "./preview-modal.js";
import {setImageEffect} from "./effects.js";
let pictures = [];
const pictureListElement = document.querySelector('.pictures');
const pictureTemplate = document.getElementById('picture')
    .content
    .querySelector('.picture');

const updatePictureCounters = (pictureElement, {likes, comments}) => {
    pictureElement.querySelector('.picture__likes').textContent = likes.length;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
}

const clearPictureList = () => {
    const pictureArray = Array.from(document.getElementsByClassName('picture'));
    pictureArray.forEach((picture) => picture.remove());
}

const onPictureElementClick = (evt) => {
    const pictureElement = evt.target.closest('.picture');
    if (pictureElement) {
        const picture = pictures.find(picture => picture.id === +pictureElement.dataset.id);
        openPreviewModal(picture);
    }
}

const renderPicturesList = (array, sort = false) => {
    if (sort) {
        clearPictureList();
    }

    if (pictures.length <= array.length) {
        pictures = array.slice();
    }


    for (const picture of pictures) {
        const pictureElement = pictureTemplate.cloneNode(true);
        pictureElement.dataset.id = picture.id;

        pictureElement.querySelector('.picture__img').setAttribute('src', Url.UPLOAD.PICTURE + picture.url);
        updatePictureCounters(pictureElement, picture);
        setImageEffect(pictureElement, picture);
        pictureListElement.append(pictureElement);
    }

    pictureListElement.addEventListener('click', onPictureElementClick);
}

const updatePicture = (picture) => {
    const pictureElement = document.querySelector(`.picture[data-id="${picture.id}"]`);

    if (pictureElement) {
        updatePictureCounters(pictureElement, picture);
    }
}

export {
    pictures,
    renderPicturesList,
    updatePicture,
    clearPictureList
};
