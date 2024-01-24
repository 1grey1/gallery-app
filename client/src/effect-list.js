import {AppStorage} from './const.js';

const EFFECTS = JSON.parse(localStorage.getItem(AppStorage.EFFECTS));
const effectListElement = document.querySelector('.effects__list');
const effectTemlate = document.getElementById('effect-item')
    .content
    .querySelector('.effects__item');

const renderEffectsList = () => {
    if (!localStorage.getItem(AppStorage.ACCESS_TOKEN)) {
        return;
    }

    for (const {name: effectName, id: effectId} of EFFECTS) {
        const effectElement = effectTemlate.cloneNode(true);

        if (effectName === 'none') {
            effectElement.querySelector('.effects__radio').setAttribute('checked', '');
        }

        effectElement.querySelector('.effects__radio').setAttribute('id', `effect-${effectName}`);
        effectElement.querySelector('.effects__label').setAttribute('for', `effect-${effectName}`);
        effectElement.querySelector('.effects__radio').setAttribute('value', effectId);
        effectElement.querySelector('.effects__preview').classList.add(`effects__preview--${effectName}`);
        effectListElement.append(effectElement);
    }
};

export {renderEffectsList};
