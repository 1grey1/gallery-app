import {openPreviewModal} from "./preview-modal.js";

const pictureListElement = document.querySelector('.pictures');
const pictureTemplate = document.getElementById('picture')
    .content
    .querySelector('.picture');

const renderPicturesList = (pictures) => {
    for (const picture of pictures) {
        const pictureElement = pictureTemplate.cloneNode(true);

        pictureElement.dataset.id = picture.id;
        pictureElement.querySelector('.picture__img').setAttribute('src', picture.url);
        pictureElement.querySelector('.picture__likes').textContent = picture.likes;
        pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
        pictureListElement.append(pictureElement);
    }

    pictureListElement.addEventListener('click', (evt) => {
        const pictureElement = evt.target.closest('.picture');
        if (pictureElement) {
            const picture = pictures.find(picture => picture.id === +pictureElement.dataset.id);
            openPreviewModal(picture);
        }
    });
}

export {renderPicturesList};
