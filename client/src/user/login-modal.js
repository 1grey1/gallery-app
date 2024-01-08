const nameElement = document.querySelector('title');
const loginModalElement = document.getElementById('login-modal');
const loginModalOpenElement = document.getElementById('login-btn');
const loginModalCloseElement = loginModalElement.querySelector('.btn-close');
const modalBackdropTemplate = document.getElementById('modal-backdrop')
    .content
    .querySelector('.modal-backdrop');

const onModalEscKeydown = (evt) => {
    if (evt.code === 'Escape') {
        closeLoginModal();
    }
};

const openLoginModal = () => {
    const modalBackdropElement = modalBackdropTemplate.cloneNode(true);
    loginModalElement.insertAdjacentElement('afterend', modalBackdropElement);
    loginModalElement.style.display = 'block';
    window.setTimeout(() => {
        loginModalElement.classList.add('show');
        document.body.classList.add('modal-open');
        nameElement.textContent = 'WebdotApp-1 | Вход';
    
        loginModalCloseElement.addEventListener('click', closeLoginModal);
        document.addEventListener('keydown', onModalEscKeydown);
    }, 0);
}

const closeLoginModal = () => {
    loginModalElement.classList.remove('show');
    window.setTimeout(() => {
        document.querySelectorAll('.modal-backdrop').forEach((bd) => bd.remove());
        loginModalElement.style.display = 'none';
        document.body.classList.remove('modal-open');
        nameElement.textContent = 'WebdotApp-1';
    
        loginModalCloseElement.removeEventListener('click', closeLoginModal);
        document.removeEventListener('keydown', onModalEscKeydown);
    }, 1000)
}

loginModalOpenElement.addEventListener('click', (evt) => {
    evt.preventDefault()
    openLoginModal();
});

export {closeLoginModal};