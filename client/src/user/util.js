const spinnerTemplate = document.getElementById('spinner')
    .content
    .querySelector('.spinner-border');

const blockButton = (buttonElement, text) => {
    blockButton.oldText = buttonElement.innerText;
    const spinnerElement = spinnerTemplate.cloneNode(true);
    buttonElement.setAttribute('disabled', '');
    buttonElement.style.cursor = 'not-allowed';

    buttonElement.innerHTML = '';
    buttonElement.insertAdjacentElement('beforeend', spinnerElement);
    buttonElement.insertAdjacentText('beforeend', `${text}...`);
};

const unblockButton = (buttonElement) => {
    buttonElement.innerHTML = blockButton.oldText;
    buttonElement.removeAttribute('disabled');
    buttonElement.style.cursor = 'pointer';
};

export {blockButton, unblockButton};
