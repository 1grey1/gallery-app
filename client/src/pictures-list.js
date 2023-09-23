import {openPreviewModal} from "./preview-modal.js";

// const pictureTemplateElement = document.getElementById('picture');
// const pictureTemplateContent = pictureTemplateElement.content;
// const pictureTemplate = pictureTemplateContent.querySelector('.picture');

const pictureListElement = document.querySelector('.pictures');
const pictureTemplate = document.getElementById('picture')
    .content
    .querySelector('.picture');

const renderPicturesList = (pictures) => {
    for (const picture of pictures) {
        const pictureElement = pictureTemplate.cloneNode(true);

        // const pictureImgElement = pictureElement.querySelector('.picture__img');
        // pictureImgElement.setAttribute('src', picture.url);

        pictureElement.querySelector('.picture__img').setAttribute('src', picture.url);
        pictureElement.querySelector('.picture__likes').textContent = picture.likes;
        pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
        pictureListElement.append(pictureElement);

        pictureElement.addEventListener('click', function () {
            openPreviewModal(picture);
        });
    }
}

export {renderPicturesList};
