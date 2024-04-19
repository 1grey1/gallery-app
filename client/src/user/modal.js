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

const onModalEscKeydown = (evt) => {
    if (evt.code === 'Escape') {
        closeModal(openModalElement);
    }
};

const onOverlayClick = (evt) => {
    if (!evt.target.closest('.modal-dialog')) {
        closeModal(openModalElement);
    }
};

const openModal = (modalElement) => {
    const modalBackdropElement = modalBackdropTemplate.cloneNode(true);
    openModalElement = modalElement;
    openModalElement.insertAdjacentElement('afterend', modalBackdropElement);
    openModalElement.style.display = 'block';
    window.setTimeout(() => {
        openModalElement.classList.add('show');
        document.body.classList.add('modal-open');
        if (openModalElement === loginModalElement){
            nameElement.textContent = 'WebdotApp-1 | Authorization';
        }
        if (openModalElement === signupModalElement) {
            nameElement.textContent = 'WebdotApp-1 | Registration';
        }

        openModalElement.querySelector('.btn-close').addEventListener('click', closeModal);
        openModalElement.addEventListener('click', onOverlayClick);
        document.addEventListener('keydown', onModalEscKeydown);
    }, 0);
}

const closeModal = () => {
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