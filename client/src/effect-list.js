import {AppStorage} from './const.js';
import {clearEntityList} from './util';

const effectListElement = document.querySelector('.effects__list');
const effectTemlate = document.getElementById('effect-item')
    .content
    .querySelector('.effects__item');

const renderEffectsList = () => {
    const effects = JSON.parse(localStorage.getItem(AppStorage.EFFECTS));
    clearEntityList('.effects__item');

    if (!localStorage.getItem(AppStorage.ACCESS_TOKEN)) {
        return;
    }

    for (const {name: effectName, id: effectId} of effects) {
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
