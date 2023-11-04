import {zoomPlus, zoomMinus} from './zoom.js';
import {onSliderUpdate, onEffectsRadioChange} from './effects.js';

const uploadModalElement = document.querySelector('.img-upload__overlay');
const uploadModalOpenElement = document.getElementById('upload-file');
const uploadModalCloseElement = document.getElementById('upload-cancel');
const previewImgElement = uploadModalElement.querySelector('.img-upload__preview img');
const scaleControlBiggerElement = uploadModalElement.querySelector('.scale__control--bigger');
const scaleControlSmallerElement = uploadModalElement.querySelector('.scale__control--smaller');
const effectPreviewElements = document.getElementsByClassName('effects__item');
const effectListElement = document.querySelector('.effects__list');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');

const onModalEscKeydown = (evt) => {
    if (evt.code === 'Escape') {
        closeUploadModal();
    }
};

const updateUploadPreview = (file) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
        previewImgElement.setAttribute('src', reader.result);
        for (const previewElement of effectPreviewElements) {
            previewElement.querySelector('.effects__preview').style.backgroundImage = `url(${reader.result})`;
        }
    });

    reader.readAsDataURL(file);
};

const openUploadModal = (file) => {
    updateUploadPreview(file);
    uploadModalElement.classList.remove('hidden');
    document.body.classList.add('modal-open');

    uploadModalCloseElement.addEventListener('click', closeUploadModal);
    document.addEventListener('keydown', onModalEscKeydown);

    scaleControlBiggerElement.addEventListener('click', zoomPlus);
    scaleControlSmallerElement.addEventListener('click', zoomMinus);

    effectListElement.addEventListener('change', onEffectsRadioChange);
    effectLevelSliderElement.noUiSlider.on('update', onSliderUpdate);
};

const closeUploadModal = () => {
    uploadModalElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    
    uploadModalCloseElement.removeEventListener('click', closeUploadModal);
    document.removeEventListener('keydown', onModalEscKeydown);
    
    scaleControlBiggerElement.removeEventListener('click', zoomPlus);
    scaleControlSmallerElement.removeEventListener('click', zoomMinus);
    
    effectListElement.removeEventListener('change', onEffectsRadioChange);
    effectLevelSliderElement.noUiSlider.off('update');
};

uploadModalOpenElement.addEventListener('change', () => {
    const file = uploadModalOpenElement.files[0];
    openUploadModal(file);
});
