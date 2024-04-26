import {MODAL_INPUT_SELECTORS} from "./const";

const getModalEscKeydownHandler = (callBack) => {
    return (evt) => {
        const isFocus = MODAL_INPUT_SELECTORS.find((selector) => {
            return document.activeElement.matches(selector);
        });

        if (evt.code === 'Escape' && !isFocus) {
            callBack();
        }
    }
};

const onModalOverlayClick = (callBack, className) => {
    return (evt) => {
        if (!evt.target.closest(`.${className}`) && className !=='img-upload__overlay') {
            callBack();
        } else if (evt.target.className === 'img-upload__overlay') {
            callBack();
        }
    }
}

export {
    getModalEscKeydownHandler,
    onModalOverlayClick
};