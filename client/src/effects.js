import {AppStorage} from './const.js';

const EFFECTS = JSON.parse(localStorage.getItem(AppStorage.EFFECTS));
const effectLevelElement = document.querySelector('.effect-level')
const effectLevelSliderElement = effectLevelElement.querySelector('.effect-level__slider');
const effectLevelValueElement = effectLevelElement.querySelector('.effect-level__value');
const previewImgElement = document.querySelector('.img-upload__preview img');

const NONE_EFFECT_KEY = 'none';

if (noUiSlider) {
    noUiSlider.create(effectLevelSliderElement, {
        range: {
            min: 0,
            max: 100
        },
        start: 50,
        step: 1,
        connect: 'lower',
        format: {
            to: function (value) {
                if (Number.isInteger(value)) {
                    return value.toFixed(0);
                }
                return value.toFixed(1);
            },
            from: function (value) {
                return parseFloat(value);
            }
        }
    });
}

const onSliderUpdate = (_, handle, unencoded) => {
    if (!localStorage.getItem(AppStorage.ACCESS_TOKEN)) {
        return;
    }

    const effectName = document.querySelector('[name=effect_id]:checked').getAttribute('id').split('-')[1];
    const effect = EFFECTS.find((effect) => effect.name === effectName);

    if (effectName !== NONE_EFFECT_KEY) {
        const filterValue = `${effect.css_filter}(${unencoded[handle] + (effect.unit ?? '')})`;
        effectLevelValueElement.setAttribute('value', unencoded[handle]);
        previewImgElement.style.filter = filterValue;
    }
}

const onEffectsRadioChange = (evt) => {
    if (!localStorage.getItem(AppStorage.ACCESS_TOKEN)) {
        return;
    }

    const effectName = evt.target.getAttribute('id').split('-')[1];
    const effect = EFFECTS.find(effect => effect.name === effectName);

    previewImgElement.setAttribute('class', '');
    previewImgElement.classList.add('class', `effects__preview--${effectName}`);

    if (effect.name !== NONE_EFFECT_KEY) {
        const options = {
            range: {
                min: effect.range_min,
                max: effect.range_max
            },
            step: effect.step
        };
        effectLevelElement.classList.remove('hidden');
        effectLevelSliderElement.noUiSlider.updateOptions(options);
        effectLevelSliderElement.noUiSlider.set(effect.start);
    } else {
        effectLevelElement.classList.add('hidden');
        effectLevelValueElement.setAttribute('value', '');
        previewImgElement.style.filter = 'unset';
    }
}

const setImageEffect = (pictureElement, picture) => {
    const effects = JSON.parse(localStorage.getItem(AppStorage.EFFECTS));
    const filter = effects.find((effect) => effect.id === picture.effect_id);
    const pictureImgElement = pictureElement.querySelector('img');
    if (picture.effect_level !== null) {
        pictureImgElement.style.filter = `${filter.css_filter}(${picture.effect_level}${filter.unit ?? ''})`;
    }else {
        pictureImgElement.style.filter = '';
    }
}

export {
    onEffectsRadioChange,
    onSliderUpdate,
    setImageEffect
};
