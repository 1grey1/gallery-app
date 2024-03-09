import {getRandomArrayElement} from './util.js';
import {renderPicturesList, clearPictureList} from './picture-list.js';

const filterList = document.querySelector('.img-filters--inactive');
const buttonsElement = document.querySelector('.img-filters__form');
const buttonDiscussedPictures = document.getElementById('filter-discussed');
const buttonDefaultPictures = document.getElementById('filter-default');
const buttonRandomPictures = document.getElementById('filter-random');

const sortedPictureList = (pictures) => {
    filterList.style.opacity = '1';

    buttonDiscussedPictures.addEventListener('click', () => {
        buttonDiscussedPictures.className = 'img-filters__button img-filters__button--active';
        buttonRandomPictures.className = 'img-filters__button';
        buttonDefaultPictures.className = 'img-filters__button';

        clearPictureList();
        renderPicturesList(pictures.sort((a, b) => b.comments.length - a.comments.length));
    });

    buttonRandomPictures.addEventListener('click', () => {
        buttonDiscussedPictures.className = 'img-filters__button';
        buttonRandomPictures.className = 'img-filters__button img-filters__button--active';
        buttonDefaultPictures.className = 'img-filters__button';

        clearPictureList();
        renderPicturesList(randomPictureArray(pictures));
    });

    buttonDefaultPictures.addEventListener('click', () => {
        buttonDiscussedPictures.className = 'img-filters__button';
        buttonRandomPictures.className = 'img-filters__button';
        buttonDefaultPictures.className = 'img-filters__button img-filters__button--active';

        clearPictureList();
        renderPicturesList(pictures.sort((a, b) => a.id - b.id));
    });
}
const randomPictureArray = (pictures) => {
    const uniqueObject = new Set();

    while (Array.from(uniqueObject).length !== pictures.length) {
        uniqueObject.add(getRandomArrayElement(pictures));
    }

    return Array.from(uniqueObject);
};

export {sortedPictureList};