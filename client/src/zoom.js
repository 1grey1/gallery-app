const uploadModalElement = document.querySelector('.img-upload__overlay');
const scaleControlValueElement = uploadModalElement.querySelector('.scale__control--value');
const scaleControlBiggerElement = uploadModalElement.querySelector('.scale__control--bigger');
const scaleControlSmallerElement = uploadModalElement.querySelector('.scale__control--smaller');
const previewImgElement = uploadModalElement.querySelector('.img-upload__preview img');

const SCALE_CONTROL_MAX_VALUE = 200;
const SCALE_CONTROL_MIN_VALUE = 25;
const SCALE_CONTROL_STEP = 25;

const isMaxValue = (value) => value === SCALE_CONTROL_MAX_VALUE;
const isMinValue = (value) => value === SCALE_CONTROL_MIN_VALUE;

const updateScaleControlElements = () => {
    const value = Number(scaleControlValueElement.value.replace('%', ''));
    // if (isMaxValue(value)) {
    //     scaleControlBiggerElement.style.cursor = 'not-allowed';
    // } else {
    //     scaleControlBiggerElement.style.cursor = 'pointer';
    // }
    
    // if (isMinValue(value)) {
    //     scaleControlSmallerElement.style.cursor = 'not-allowed';
    // } else {
    //     scaleControlSmallerElement.style.cursor = 'pointer';
    // }

    scaleControlBiggerElement.style.cursor = isMaxValue(value) ? 'not-allowed' : 'pointer';
    scaleControlSmallerElement.style.cursor = isMinValue(value) ? 'not-allowed' : 'pointer';
}

const zoomPlus = () => {
    const value = Number(scaleControlValueElement.value.replace('%', ''));
    if (value < SCALE_CONTROL_MAX_VALUE) {
        const newValue = value + SCALE_CONTROL_STEP;
        scaleControlValueElement.value = newValue + '%';
        previewImgElement.style.transform = `scale(${newValue / 100})`;
        updateScaleControlElements();
    }
};

const zoomMinus = () => {
    const value = Number(scaleControlValueElement.value.replace('%', ''));
    if (value > SCALE_CONTROL_MIN_VALUE) {
        const newValue = value - SCALE_CONTROL_STEP;
        scaleControlValueElement.value = newValue + '%';
        previewImgElement.style.transform = `scale(${newValue / 100})`;
        updateScaleControlElements();
    }
};

export {zoomPlus, zoomMinus};
