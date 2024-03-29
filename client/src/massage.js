const loaderTemplate = document.getElementById('messages')
    .content
    .querySelector('.img-upload__message');
const modalBackdropTemplate = document.getElementById('modal-backdrop')
    .content
    .querySelector('.modal-backdrop');
const modalSuccessTemplate = document.getElementById('success')
    .content
    .querySelector('.success');

const renderSuccessMassage = (callback) => {
    const modalSuccessElement = modalSuccessTemplate.cloneNode(true);
    const buttonSuccessElement = modalSuccessElement.querySelector('.success__button');

    buttonSuccessElement.addEventListener('click', closeSuccessMassage);
    document.querySelectorAll('.modal-backdrop').forEach((bd) => bd.remove());
    document.body.append(modalSuccessElement);
    callback();
}

const renderMassage = (type, callback) => {
    const modalBackdropElement = modalBackdropTemplate.cloneNode(true);
    const loaderElement = loaderTemplate.cloneNode(true);
    const progressBarElement = loaderElement.querySelector('.progress-bar');

    document.body.append(loaderElement);
    loaderElement.insertAdjacentElement('beforebegin', modalBackdropElement);
    modalBackdropElement.style.zIndex = '1';

    window.setTimeout(() => {
        progressBarElement.style.width = '100%';

        window.setTimeout(() => {
            loaderElement.remove();
            renderSuccessMassage(callback);
        // TODO: вынести в CSS переменную
        },2000);
    }, 100);
}

const closeSuccessMassage = () => {
    document.querySelectorAll('.success').forEach((bd) => bd.remove());
    document.querySelectorAll('.modal-backdrop').forEach((bd) => bd.remove());
    modalSuccessTemplate.querySelector('.success__button').removeEventListener('click', closeSuccessMassage);
}

export {renderMassage}
