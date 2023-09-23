import {onScaleControlClick} from "./zoom.js";

const uploadModalElement = document.querySelector('.img-upload__overlay');
const uploadModalOpenElement = document.getElementById('upload-file');
const uploadModalCloseElement = document.getElementById('upload-cancel');
const previewImgElement = uploadModalElement.querySelector('.img-upload__preview img');

const onModalEscKeydown = (evt) => {
    if (evt.code === 'Escape') {
        closeUploadModal();
    }
};

const updateUploadPreview = (file) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
        previewImgElement.setAttribute('src', reader.result);
    });

    reader.readAsDataURL(file);
};

const openUploadModal = (file) => {
    updateUploadPreview(file);
    uploadModalElement.classList.remove('hidden');
    document.body.classList.add('modal-open');

    uploadModalCloseElement.addEventListener('click', closeUploadModal);
    document.addEventListener('keydown', onModalEscKeydown);
    onScaleControlClick
};

const closeUploadModal = () => {
    uploadModalElement.classList.add('hidden');
    document.body.classList.remove('modal-open');

    uploadModalCloseElement.removeEventListener('click', closeUploadModal);
    document.removeEventListener('keydown', onModalEscKeydown);
};

uploadModalOpenElement.addEventListener('change', () => {
    const file = uploadModalOpenElement.files[0];
    openUploadModal(file);
});
