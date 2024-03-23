import {VALIDATION_ERROR_KEYS, VALIDATORS} from './validation.js';
import {blockButton, unblockButton} from './user/util.js';
import {sendData} from './api.js';
import {AppStorage, Url} from './const.js';

const MAX_DESCRIPTION_LENGTH = 400;
const uploadFormElement = document.querySelector('#upload-select-image');
const submitBtnElement = uploadFormElement.querySelector('[type=submit]');

/**
 * Обработчик события INPUT к полю описания публикации
 * @param {InputEvent} evt Объект события
 * @return {undefined}
 */
const onDescTextareaInput = (evt) => {
    const valueLength = evt.target.value.length;
    let error = '';

    if (valueLength > MAX_DESCRIPTION_LENGTH) {
        error = `Удалите лишние ${valueLength - MAX_DESCRIPTION_LENGTH} симв.`;
    }

    evt.target.setCustomValidity(error);
    evt.target.reportValidity();
};

const onHashtagsInput = (evt) => {
    const errors = new Set();
    const uniqueHashtags = new Set();

    const errorAddition = {};
    errorAddition[VALIDATION_ERROR_KEYS[3]] = null;
    errorAddition[VALIDATION_ERROR_KEYS[5]] = null;

    for (const hashtag of evt.target.value.split(' ')) {
        if (hashtag === '') {
            continue;
        }

        for (const validator of VALIDATORS) {
            const args = [hashtag, uniqueHashtags, errorAddition];
            if (validator.callback.apply(validator, args)) {
                errors.add(validator.error);
            }
        }
    }

    const resultErrors = [];

    for (const error of errors) {
        if ([VALIDATION_ERROR_KEYS[3], VALIDATION_ERROR_KEYS[5]].includes(error)) {
            resultErrors.push(error + errorAddition[error])
        } else {
            resultErrors.push(error);
        }
    }

    evt.target.setCustomValidity(resultErrors.join('\n'));
    evt.target.reportValidity();
};

const setUploadFormSabmit = (onSuccess, onFail) => {
    uploadFormElement.addEventListener('submit', (evt) => {
        evt.preventDefault();

        if (!localStorage.getItem(AppStorage.ACCESS_TOKEN)) {
            return;
        }

        const {user} = JSON.parse(localStorage.getItem(AppStorage.ACCESS_TOKEN));

        const formData = new FormData(uploadFormElement);
        formData.set('user_id', user.id);

        blockButton(submitBtnElement, 'Публикация', false);
        window.setTimeout(() => {
            sendData(
                Url.PICTURE.POST,
                () => {
                    unblockButton(submitBtnElement);
                    onSuccess();
                },
                () => {},
                formData
            );
        }, 0);
    })
};

export {
    onDescTextareaInput,
    onHashtagsInput,
    setUploadFormSabmit
};
