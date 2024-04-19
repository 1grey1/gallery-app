import {Url} from "./const.js";
import {openPreviewModal} from "./preview-modal.js";
import {setImageEffect} from "./effects.js";
import {clearEntityList} from "./util";
let pictures = [];
let lengthArray = 26;
const pictureListElement = document.querySelector('.pictures');
const pictureTemplate = document.getElementById('picture')
    .content
    .querySelector('.picture');

const updatePictureCounters = (pictureElement, {likes, comments}) => {
    pictureElement.querySelector('.picture__likes').textContent = likes.length;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
};

const onPictureElementClick = (evt) => {
    const pictureElement = evt.target.closest('.picture');
    if (pictureElement) {
        const picture = pictures.find(picture => picture.id === +pictureElement.dataset.id);
        openPreviewModal(picture);
    }
};

const renderPicturesList = (array, sort = false) => {
    if (sort) {
        clearEntityList('.picture');
    }

    pictures = array;

    for (const picture of pictures.slice(lengthArray-26, lengthArray)) {
        const pictureElement = pictureTemplate.cloneNode(true);
        pictureElement.dataset.id = picture.id;

        pictureElement.querySelector('.picture__img').setAttribute('src', Url.UPLOAD.PICTURE + picture.url);
        updatePictureCounters(pictureElement, picture);
        setImageEffect(pictureElement, picture);
        pictureListElement.append(pictureElement);
    }

    pictureListElement.addEventListener('click', onPictureElementClick);
};

const updatePicture = (picture) => {
    const pictureElement = document.querySelector(`.picture[data-id="${picture.id}"]`);

    if (pictureElement) {
        updatePictureCounters(pictureElement, picture);
    }
};

window.addEventListener('scroll', function() {
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

    if ((windowRelativeBottom < document.documentElement.clientHeight + 100) && (pictures.length >= lengthArray)) {
        lengthArray += 26;
        renderPicturesList(pictures);
    }

});

export {
    pictures,
    renderPicturesList,
    updatePicture
};
