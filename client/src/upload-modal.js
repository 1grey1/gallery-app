import {zoomPlus, zoomMinus} from './zoom.js';
import {onSliderUpdate, onEffectsRadioChange} from './effects.js';
import {onDescTextareaInput, onHashtagsInput} from './upload-form.js';

const uploadModalElement = document.querySelector('.img-upload__overlay');
const uploadModalOpenElement = document.getElementById('upload-file');
const uploadModalCloseElement = document.getElementById('upload-cancel');
const previewImgElement = uploadModalElement.querySelector('.img-upload__preview img');
const scaleControlBiggerElement = uploadModalElement.querySelector('.scale__control--bigger');
const scaleControlSmallerElement = uploadModalElement.querySelector('.scale__control--smaller');
const effectPreviewElements = document.getElementsByClassName('effects__item');
const effectListElement = document.querySelector('.effects__list');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const hashtagsInput = uploadModalElement.querySelector('.text__hashtags');
const descriptionTextarea = uploadModalElement.querySelector('.text__description');

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

const handlers = [
    {
        element: uploadModalCloseElement,
        event: 'click',
        callback: closeUploadModal
    },
    {
        element: document,
        event: 'keydown',
        callback: onModalEscKeydown
    },
    {
        element: scaleControlBiggerElement,
        event: 'click',
        callback: zoomPlus
    },
    {
        element: scaleControlSmallerElement,
        event: 'click',
        callback: zoomMinus
    },
    {
        element: effectListElement,
        event: 'change',
        callback: onEffectsRadioChange
    },
    {
        element: hashtagsInput,
        event: 'input',
        callback: onHashtagsInput
    },
    {
        element: descriptionTextarea,
        event: 'input',
        callback: onDescTextareaInput
    }
];

function openUploadModal(file) {
    updateUploadPreview(file);
    uploadModalElement.classList.remove('hidden');
    document.body.classList.add('modal-open');

    for (const {element, event, callback} of handlers) {
        element.addEventListener(event, callback);
    }

    effectLevelSliderElement.noUiSlider.on('update', onSliderUpdate);
};

function closeUploadModal() {
    uploadModalElement.classList.add('hidden');
    document.body.classList.remove('modal-open');

    for (const {element, event, callback} of handlers) {
        element.removeEventListener(event, callback);
    }

    effectLevelSliderElement.noUiSlider.off('update');
};

uploadModalOpenElement.addEventListener('change', () => {
    const file = uploadModalOpenElement.files[0];
    openUploadModal(file);
});

export {closeUploadModal};
