const loaderTemplate = document.getElementById('messages')
    .content
    .querySelector('.img-upload__message');
const modalBackdropTemplate = document.getElementById('modal-backdrop')
    .content
    .querySelector('.modal-backdrop');

const PROGRESS_BAR_TRANSITION = 2000;
document.documentElement.style.setProperty('--progress-bar-transition', `${PROGRESS_BAR_TRANSITION}ms`);

const renderMessage = (type, callback) => {
    const messageElement = document.getElementById(type)
        .content
        .querySelector(`.${type}`)
        .cloneNode(true);
    const btnElement = messageElement.querySelector(`.${type}__button`);

    btnElement.addEventListener('click', removeMassages);
    document.querySelectorAll('.modal-backdrop').forEach((bd) => bd.remove());
    document.body.append(messageElement);
    callback();
};

const removeMassages = () => {
    document.querySelectorAll('.message')
        .forEach((messageElement) => {
            messageElement.querySelector('button').removeEventListener('click', removeMassages);
            messageElement.remove();
        });
    document.querySelectorAll('.modal-backdrop')
        .forEach((backdropElement) => backdropElement.remove());
};

const renderProgressBar = (type, callback) => {
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
            renderMessage(type, callback);
        }, PROGRESS_BAR_TRANSITION);
    }, 100);
};

export {renderProgressBar}
