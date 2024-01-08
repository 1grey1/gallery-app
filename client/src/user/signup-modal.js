const nameElement = document.querySelector('title');
const signupModalElement = document.getElementById('signup-modal');
const signupModalOpenElement = document.getElementById('signup-btn');
const signupModalCloseElement = signupModalElement.querySelector('.btn-close');
const modalBackdropTemplate = document.getElementById('modal-backdrop')
    .content
    .querySelector('.modal-backdrop');

const onModalEscKeydown = (evt) => {
    if (evt.code === 'Escape') {
        closeSignupModal();
    }
};

const openSignupModal = () => {
    const modalBackdropElement = modalBackdropTemplate.cloneNode(true);
    signupModalElement.insertAdjacentElement('afterend', modalBackdropElement);
    signupModalElement.style.display = 'block';
    window.setTimeout(() => {
        signupModalElement.classList.add('show');
        document.body.classList.add('modal-open');
        nameElement.textContent = 'WebdotApp-1 | Регистрация';
    
        signupModalCloseElement.addEventListener('click', closeSignupModal);
        document.addEventListener('keydown', onModalEscKeydown);
    }, 0);
}

const closeSignupModal = () => {
    signupModalElement.classList.remove('show');
    window.setTimeout(() => {
        document.querySelectorAll('.modal-backdrop').forEach((bd) => bd.remove());
        signupModalElement.style.display = 'none';
        document.body.classList.remove('modal-open');
        nameElement.textContent = 'WebdotApp-1';
    
        signupModalCloseElement.removeEventListener('click', closeSignupModal);
        document.removeEventListener('keydown', onModalEscKeydown);
    }, 1000)
}

signupModalOpenElement.addEventListener('click', (evt) => {
    evt.preventDefault()
    openSignupModal();
});

export {closeSignupModal};