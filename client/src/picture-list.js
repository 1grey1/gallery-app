import {openPreviewModal} from "./preview-modal.js";

const pictureListElement = document.querySelector('.pictures');
const pictureTemplate = document.getElementById('picture')
    .content
    .querySelector('.picture');

const renderPicturesList = (pictures) => {
    for (const {id, url, likes, comments} of pictures) {
        const pictureElement = pictureTemplate.cloneNode(true);

        pictureElement.dataset.id = id;
        pictureElement.querySelector('.picture__img').setAttribute('src', `http://localhost:80/uploads/pictures/${url}`);
        pictureElement.querySelector('.picture__likes').textContent = likes.length;
        pictureElement.querySelector('.picture__comments').textContent = comments.length;
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
