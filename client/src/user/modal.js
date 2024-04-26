import {getModalEscKeydownHandler, onModalOverlayClick} from "../modal-util";

const nameElement = document.querySelector('title');
const loginModalElement = document.getElementById('login-modal');
const signupModalElement = document.getElementById('signup-modal');
const signupModalOpenElement = document.getElementById('signup-btn');
const loginModalOpenElement = document.getElementById('login-btn');
const modalBackdropTemplate = document.getElementById('modal-backdrop')
    .content
    .querySelector('.modal-backdrop');

const evtModal = [
    {
        btnElement: loginModalOpenElement,
        modalElement: loginModalElement
    },
    {
        btnElement: signupModalOpenElement,
        modalElement: signupModalElement
    }
];

let openModalElement;

const onModalEscKeydown = getModalEscKeydownHandler(() => {
    closeModal(openModalElement);
});
const onOverlayClick = onModalOverlayClick(() => {
    closeModal(openModalElement);
}, 'modal-dialog');

const openModal = (modalElement) => {
    const modalBackdropElement = modalBackdropTemplate.cloneNode(true);
    openModalElement = modalElement;
    openModalElement.insertAdjacentElement('afterend', modalBackdropElement);
    openModalElement.style.display = 'block';

    window.setTimeout(() => {
        openModalElement.classList.add('show');
        document.body.classList.add('modal-open');

        switch (openModalElement) {
            case loginModalElement:
                nameElement.textContent = 'WebdotApp-1 | Authorization';
                break;
            case signupModalElement:
                nameElement.textContent = 'WebdotApp-1 | Registration';
                break;
        }

        openModalElement.querySelector('.btn-close').addEventListener('click', closeModal);
        openModalElement.addEventListener('click', onOverlayClick);
        document.addEventListener('keydown', onModalEscKeydown);
    }, 0);
}

function closeModal() {
    openModalElement.classList.remove('show');
    window.setTimeout(() => {
        document.querySelectorAll('.modal-backdrop').forEach((bd) => bd.remove());
        openModalElement.style.display = 'none';
        document.body.classList.remove('modal-open');
        nameElement.textContent = 'WebdotApp-1';

        openModalElement.querySelector('.btn-close').removeEventListener('click', closeModal);
        openModalElement.removeEventListener('click', onOverlayClick);
        document.removeEventListener('keydown', onModalEscKeydown);
    }, 1000)
}

for (const {btnElement, modalElement} of evtModal) {
    btnElement.addEventListener('click', (evt) => {
        evt.preventDefault()
        openModal(modalElement);
    });
}

export {closeModal};