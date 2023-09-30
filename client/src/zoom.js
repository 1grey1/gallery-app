const comingButtonElement = document.querySelector('.scale__control--bigger');
const withdrawaButtonElement = document.querySelector('.scale__control--smaller');
const scaleControlValueElement = document.querySelector('.scale__control--value');
let scaleControNumberElement = scaleControlValueElement.value = '100'.replace('%', '');

const onScaleControlClick = () => {
    comingButtonElement.addEventListener('click', comingPicnehe);
    withdrawaButtonElement.addEventListener('click', withdrawalPicnehe);
};

const comingPicnehe = () => {
    if (Number(scaleControNumberElement) < 100){
        scaleControNumberElement = Number(scaleControNumberElement) + 25;
    }
    scaleControlValueElement.value = '100%'.replace('100', String(scaleControNumberElement));
};

const withdrawalPicnehe = () => {
    if (Number(scaleControNumberElement) > 0){
        scaleControNumberElement = Number(scaleControNumberElement) - 25;
    }
    scaleControlValueElement.value = '100%'.replace('100', String(scaleControNumberElement));
};

export {onScaleControlClick};