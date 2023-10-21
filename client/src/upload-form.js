import {VALIDATION_ERROR_KEYS} from './const.js';

const uploadModalElement = document.querySelector('.img-upload__overlay');
const hashtagsInput = uploadModalElement.querySelector('.text__hashtags');
const descriptionTextarea = uploadModalElement.querySelector('.text__description');

const MAX_DESCRIPTION_LENGTH = 400;
const MAX_HASHTAG_LENGTH = 5;
const MAX_HASHTAG_COUNT = 5;

if (descriptionTextarea) {
    descriptionTextarea.addEventListener('input', () => {
        const valueLength = descriptionTextarea.value.length;

        let error = '';
        if (valueLength > MAX_DESCRIPTION_LENGTH) {
            error = `Удалите лишние ${valueLength - MAX_DESCRIPTION_LENGTH} симв.`;
        }

        descriptionTextarea.setCustomValidity(error);
        descriptionTextarea.reportValidity();
    });
}

if (hashtagsInput) {
    hashtagsInput.addEventListener('input', () => {
        const errors = new Set();
        const uniqueHashtags = new Set();

        const errorAddition = new Map();
        errorAddition.set(VALIDATION_ERROR_KEYS[3], null);
        errorAddition.set(VALIDATION_ERROR_KEYS[5], null);

        for (const hashtag of hashtagsInput.value.split(' ')) {
            if (hashtag === '') {
                continue;
            }

            if (uniqueHashtags.has(hashtag.toLowerCase())) {
                errors.add(VALIDATION_ERROR_KEYS[4]);
            } else {
                uniqueHashtags.add(hashtag);
            }

            if (hashtag[0] !== '#') {
                errors.add(VALIDATION_ERROR_KEYS[0]);
            }

            if (hashtag.length > 1 && !/^#[A-Za-zА-Яа-я0-9]{1,19}$/.test(hashtag)) {
                errors.add(VALIDATION_ERROR_KEYS[1]);
            }

            if (hashtag === '#') {
                errors.add(VALIDATION_ERROR_KEYS[2]);
            }

            if (hashtag.length > MAX_HASHTAG_LENGTH) {
                errors.add(VALIDATION_ERROR_KEYS[3]);
                errorAddition.set(VALIDATION_ERROR_KEYS[3], ` Удалите лишние ${hashtag.length - MAX_HASHTAG_LENGTH} симв.`);
            }

            if (uniqueHashtags.size > MAX_HASHTAG_COUNT) {
                errors.add(VALIDATION_ERROR_KEYS[5]);
                errorAddition.set(VALIDATION_ERROR_KEYS[5], ` Удалите лишние ${uniqueHashtags.size - MAX_HASHTAG_COUNT} хешт.`);
            }
        }

        const resultErrors = [];

        for (const error of errors) {
            if ([VALIDATION_ERROR_KEYS[3], VALIDATION_ERROR_KEYS[5]].includes(error)) {
                resultErrors.push(error + errorAddition.get(error))
            } else {
                resultErrors.push(error);
            }
        }

        hashtagsInput.setCustomValidity(resultErrors.join('\n'));
        hashtagsInput.reportValidity();
    });
}