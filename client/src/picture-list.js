import {openPreviewModal} from "./preview-modal.js";

const pictureListElement = document.querySelector('.pictures');
const pictureTemplate = document.getElementById('picture')
    .content
    .querySelector('.picture');

    
const renderPicturesList = (pictures, sort = false) => {
    if (sort) {
        clearPictureList();
    }
    
    const evr = (evt) => {
        pictureListElement.removeEventListener('click', evr);
        const pictureElement = evt.target.closest('.picture');
        if (pictureElement) {
            const picture = pictures.find(picture => picture.id === +pictureElement.dataset.id);
            openPreviewModal(picture);
            pictureListElement.addEventListener('click', evr);
        }
    }
    
    for (const {id, url, likes, comments} of pictures) {
        const pictureElement = pictureTemplate.cloneNode(true);
        
        pictureElement.dataset.id = id;
        pictureElement.querySelector('.picture__img').setAttribute('src', `http://localhost:80/uploads/pictures/${url}`);
        // TODO: вынести в функцию
        pictureElement.querySelector('.picture__likes').textContent = likes.length;
        pictureElement.querySelector('.picture__comments').textContent = comments.length;
        pictureListElement.append(pictureElement);
    }

    pictureListElement.addEventListener('click', evr);
}

const updatePicture = (picture) => {
    const {id, comments, likes} = picture;
    const pictureElement = document.querySelector(`.picture[data-id="${id}"]`);
    if (pictureElement) {
        pictureElement.querySelector('.picture__likes').textContent = likes.length;
        pictureElement.querySelector('.picture__comments').textContent = comments.length;
    }
}

const clearPictureList = () => {
    const pictureArray = Array.from(document.getElementsByClassName('picture'));
    pictureArray.forEach((picture) => picture.remove());
}

export {renderPicturesList, updatePicture, clearPictureList};

// const test1 = function (value1, value2) {
//     this.x = 666;
// };

// const test2 = function () {};

// test1.call(test2, 10, 20);
// test1.apply(test2, [10, 20]);
