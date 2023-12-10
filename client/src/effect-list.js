import {EFFECTS} from './const.js';

const effectListElement = document.querySelector('.effects__list');
const effectTemlate = document.getElementById('effect-item')
    .content
    .querySelector('.effects__item');

const  renderEffectsList = () => {
    for (const {name: effectName} of EFFECTS) {
        const effectElement = effectTemlate.cloneNode(true);

        if (effectName === 'none') {
            effectElement.querySelector('.effects__radio').setAttribute('checked', '');
        }

        effectElement.querySelector('.effects__radio').setAttribute('id', `effect-${effectName}`);
        effectElement.querySelector('.effects__label').setAttribute('for', `effect-${effectName}`);
        effectElement.querySelector('.effects__preview').classList.add(`effects__preview--${effectName}`);
        effectListElement.append(effectElement);
    }
};

export {renderEffectsList};
