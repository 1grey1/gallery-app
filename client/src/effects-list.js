import {EFFECTS} from './const.js';

const previewImgElement = document.querySelector('.img-upload__preview img');
const effectListElement = document.querySelector('.effects__list');
const effectTemlate = document.getElementById('effect-item')
    .content
    .querySelector('.effects__item');

const  renderEffectsList = () => {
    for (const effect of EFFECTS) {
        const effectElement = effectTemlate.cloneNode(true);

        if (effect === 'none') {
            effectElement.querySelector('.effects__radio').setAttribute('checked', '');
        }

        effectElement.querySelector('.effects__radio').setAttribute('id', `effect-${effect}`);
        effectElement.querySelector('.effects__label').setAttribute('for', `effect-${effect}`);
        effectElement.querySelector('.effects__preview').classList.add(`effects__preview--${effect}`);
        effectListElement.append(effectElement);

        effectElement.addEventListener('click', () => {
            previewImgElement.setAttribute('class', '');
            previewImgElement.classList.add('class', `effects__preview--${effect}`);
        });
    }
}

export {renderEffectsList};
