const spinnerTemplate = document.getElementById('spinner')
    .content
    .querySelector('.spinner-border');

const blockButton = (buttonElement, text, renderSpiner = true) => {
    buttonElement.setAttribute('disabled', '');
    buttonElement.style.cursor = 'not-allowed';

    if (text) {
        const spinnerElement = spinnerTemplate.cloneNode(true);
        blockButton.oldText = buttonElement.innerText;
        buttonElement.innerHTML = '';
        if (renderSpiner) {
            buttonElement.insertAdjacentElement('beforeend', spinnerElement);
        }
        buttonElement.insertAdjacentText('beforeend', `${text}...`);
    }
};

const unblockButton = (buttonElement) => {
    if (blockButton.oldText) {
        buttonElement.innerHTML = blockButton.oldText;
    }

    buttonElement.removeAttribute('disabled');
    buttonElement.style.cursor = 'pointer';
};

export {
    blockButton,
    unblockButton
};
