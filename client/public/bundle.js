/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getData: () => (/* binding */ getData),
/* harmony export */   sendData: () => (/* binding */ sendData)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const.js */ "./src/const.js");


const getToken = () => {
    if (!localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_0__.AppStorage.ACCESS_TOKEN)){
        return;
    }

    return JSON.parse(localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_0__.AppStorage.ACCESS_TOKEN)).token;
}

const getData = (url, onSuccess, onFail) => {
    const token = getToken();

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('Authorization', `Basic ${btoa(token + ':')}`);

    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            onSuccess(xhr.response);
        }
    });

    xhr.send();
}

const sendData = (url, onSuccess, onFail, body) => {
    const token = getToken();

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Authorization', `Basic ${btoa(token + ':')}`);

    xhr.addEventListener('load', () => {
        if (xhr.status === 201) {
            onSuccess();
        }
    });

    xhr.send(body);
}




/***/ }),

/***/ "./src/comment-form.js":
/*!*****************************!*\
  !*** ./src/comment-form.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setCommentFormSabmit: () => (/* binding */ setCommentFormSabmit)
/* harmony export */ });
/* harmony import */ var _user_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user/util.js */ "./src/user/util.js");
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.js */ "./src/api.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./const.js */ "./src/const.js");




const commentFormElement = document.querySelector('#comment-form');
const  submitBtnElement = commentFormElement.querySelector('[type=submit]');

const setCommentFormSabmit = (onSuccess, onFail) => {
    commentFormElement.addEventListener('submit', (evt) => {
        evt.preventDefault();

        if (!localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_2__.AppStorage.ACCESS_TOKEN)) {
            return;
        }

        const {user} = JSON.parse(localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_2__.AppStorage.ACCESS_TOKEN));

        const formData = new FormData(commentFormElement);
        formData.set('user_id', user.id);

        (0,_user_util_js__WEBPACK_IMPORTED_MODULE_0__.blockButton)(submitBtnElement, 'Отправка');
        window.setTimeout(() => {
            (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.sendData)(
                _const_js__WEBPACK_IMPORTED_MODULE_2__.Url.COMMENT.POST,
                () => {
                    (0,_user_util_js__WEBPACK_IMPORTED_MODULE_0__.unblockButton)(submitBtnElement);
                    onSuccess();
                },
                () => {},
                formData
            );
        }, 2000);
        console.log(1);
    });
};




/***/ }),

/***/ "./src/comment-list.js":
/*!*****************************!*\
  !*** ./src/comment-list.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderCommentList: () => (/* binding */ renderCommentList)
/* harmony export */ });
const totalCommentCountElement = document.querySelector('.comments-count');
const renderedCommentCountElement = document.querySelector('.comments-count--rendered');
const showMoreButtonElement = document.querySelector('.social__comments-loader');
const commentListElement = document.querySelector('.social__comments');
const commentTemlate = document.getElementById('comment')
    .content
    .querySelector('.social__comment');

const COMMENT_COUNT_PER_STEP = 5;

const setLoaderClick = function (comments) {
    if (this.onLoaderClick !== undefined) {
        showMoreButtonElement.removeEventListener('click', this.onLoaderClick);
    }

    this.onLoaderClick = () => {
        renderComments(comments, renderedCommentCount, renderedCommentCount + COMMENT_COUNT_PER_STEP);
        renderedCommentCount += COMMENT_COUNT_PER_STEP;
        if (renderedCommentCount >= comments.length) {
            showMoreButtonElement.classList.add('hidden');
        }
    };

    let renderedCommentCount = 5;
    showMoreButtonElement.addEventListener('click', this.onLoaderClick);
}

const renderComments = (comments, from, to) => {
    for (const {message, user} of comments.slice(from, to)) {
        const commentElement = commentTemlate.cloneNode(true);
        commentElement.querySelector('.social__text').textContent = message;
        commentElement.querySelector('.social__picture').setAttribute('src', user.avatar);
        commentListElement.append(commentElement);
        renderedCommentCountElement.textContent = String((+renderedCommentCountElement.textContent) + 1);
    }
};

const renderCommentList = (comments) => {
    commentListElement.innerHTML = '';

    const to = Math.min(comments.length, COMMENT_COUNT_PER_STEP);

    renderComments(comments, 0, to);
    totalCommentCountElement.textContent = String(comments.length);
    renderedCommentCountElement.textContent = String(to);

    if (comments.length > COMMENT_COUNT_PER_STEP) {
        showMoreButtonElement.classList.remove('hidden');
    } else {
        showMoreButtonElement.classList.add('hidden');
    }

    setLoaderClick.call(renderCommentList, comments);
};




/***/ }),

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppStorage: () => (/* binding */ AppStorage),
/* harmony export */   Url: () => (/* binding */ Url)
/* harmony export */ });
const scheme = 'http';
const host = 'localhost';
const port = '80';

const Url = {
    ACCESS_TOKEN: {
        POST: `${scheme}://${host}:${port}/token`,
        DELETE: `${scheme}://${host}:${port}/logout/`
    },
    COMMENT: {
        GET: `${scheme}://${host}:${port}/comment`,
        POST: `${scheme}://${host}:${port}/comment`
    },
    EFFECT: {
        GET: `${scheme}://${host}:${port}/effect`
    },
    LIKE: {
        POST: null,
        DELETE: null
    },
    PICTURE: {
        GET: `${scheme}://${host}:${port}/picture`,
        POST: `${scheme}://${host}:${port}/picture`
    },
    USER: {
        POST: `${scheme}://${host}:${port}/user`
    },
    UPLOAD: {
        AVATAR: `${scheme}://${host}:${port}/uploads/avatars/`,
        PICTURE: `${scheme}://${host}:${port}/uploads/pictures/`
    }
};

const AppStorage = {
    ACCESS_TOKEN: `gallery_${btoa('token')}`,
    EFFECTS: `gallery_${btoa('effects')}`
}




/***/ }),

/***/ "./src/effect-list.js":
/*!****************************!*\
  !*** ./src/effect-list.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderEffectsList: () => (/* binding */ renderEffectsList)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const.js */ "./src/const.js");


const EFFECTS = JSON.parse(localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_0__.AppStorage.EFFECTS));
const effectListElement = document.querySelector('.effects__list');
const effectTemlate = document.getElementById('effect-item')
    .content
    .querySelector('.effects__item');

const renderEffectsList = () => {
    if (!localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_0__.AppStorage.ACCESS_TOKEN)) {
        return;
    }

    for (const {name: effectName, id: effectId} of EFFECTS) {
        const effectElement = effectTemlate.cloneNode(true);

        if (effectName === 'none') {
            effectElement.querySelector('.effects__radio').setAttribute('checked', '');
        }

        effectElement.querySelector('.effects__radio').setAttribute('id', `effect-${effectName}`);
        effectElement.querySelector('.effects__label').setAttribute('for', `effect-${effectName}`);
        effectElement.querySelector('.effects__radio').setAttribute('value', effectId);
        effectElement.querySelector('.effects__preview').classList.add(`effects__preview--${effectName}`);
        effectListElement.append(effectElement);
    }
};




/***/ }),

/***/ "./src/effects.js":
/*!************************!*\
  !*** ./src/effects.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   onEffectsRadioChange: () => (/* binding */ onEffectsRadioChange),
/* harmony export */   onSliderUpdate: () => (/* binding */ onSliderUpdate)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const.js */ "./src/const.js");


const EFFECTS = JSON.parse(localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_0__.AppStorage.EFFECTS));
const effectLevelElement = document.querySelector('.effect-level')
const effectLevelSliderElement = effectLevelElement.querySelector('.effect-level__slider');
const effectLevelValueElement = effectLevelElement.querySelector('.effect-level__value');
const previewImgElement = document.querySelector('.img-upload__preview img');

const NONE_EFFECT_KEY = 'none';

if (noUiSlider) {
    noUiSlider.create(effectLevelSliderElement, {
        range: {
            min: 0,
            max: 100
        },
        start: 50,
        step: 1,
        connect: 'lower',
        format: {
            to: function (value) {
                if (Number.isInteger(value)) {
                    return value.toFixed(0);
                }
                return value.toFixed(1);
            },
            from: function (value) {
                return parseFloat(value);
            }
        }
    });
}

const onSliderUpdate = (_, handle, unencoded) => {
    if (!localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_0__.AppStorage.ACCESS_TOKEN)) {
        return;
    }

    const effectName = document.querySelector('[name=effect_id]:checked').getAttribute('id').split('-')[1];
    const effect = EFFECTS.find(effect => effect.name === effectName);

    if (effectName !== NONE_EFFECT_KEY) {
        const filterValue = `${effect.css_filter}(${unencoded[handle] + (effect.unit ?? '')})`;
        effectLevelValueElement.setAttribute('value', unencoded[handle]);
        previewImgElement.style.filter = filterValue;
    }
}

const onEffectsRadioChange = (evt) => {
    if (!localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_0__.AppStorage.ACCESS_TOKEN)) {
        return;
    }

    const effectName = evt.target.getAttribute('id').split('-')[1];
    const effect = EFFECTS.find(effect => effect.name === effectName);

    previewImgElement.setAttribute('class', '');
    previewImgElement.classList.add('class', `effects__preview--${effectName}`);

    if (effect.name !== NONE_EFFECT_KEY) {
        const options = {
            range: {
                min: effect.range_min,
                max: effect.range_max
            },
            step: effect.step
        };
        effectLevelElement.classList.remove('hidden');
        effectLevelSliderElement.noUiSlider.updateOptions(options);
        effectLevelSliderElement.noUiSlider.set(effect.start);
    } else {
        effectLevelElement.classList.add('hidden');
        effectLevelValueElement.setAttribute('value', '');
        previewImgElement.style.filter = 'unset';
    }
}




/***/ }),

/***/ "./src/picture-list.js":
/*!*****************************!*\
  !*** ./src/picture-list.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderPicturesList: () => (/* binding */ renderPicturesList)
/* harmony export */ });
/* harmony import */ var _preview_modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./preview-modal.js */ "./src/preview-modal.js");


const pictureListElement = document.querySelector('.pictures');
const pictureTemplate = document.getElementById('picture')
    .content
    .querySelector('.picture');

const renderPicturesList = (pictures) => {
    for (const {id, url, likes, comments} of pictures) {
        const pictureElement = pictureTemplate.cloneNode(true);

        pictureElement.dataset.id = id;
        pictureElement.querySelector('.picture__img').setAttribute('src', `http://localhost:80/uploads/pictures/${url}`);
        pictureElement.querySelector('.picture__likes').textContent = likes;
        pictureElement.querySelector('.picture__comments').textContent = comments.length;
        pictureListElement.append(pictureElement);
    }

    pictureListElement.addEventListener('click', (evt) => {
        const pictureElement = evt.target.closest('.picture');
        if (pictureElement) {
            const picture = pictures.find(picture => picture.id === +pictureElement.dataset.id);
            (0,_preview_modal_js__WEBPACK_IMPORTED_MODULE_0__.openPreviewModal)(picture);
        }
    });
}




/***/ }),

/***/ "./src/preview-modal.js":
/*!******************************!*\
  !*** ./src/preview-modal.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   openPreviewModal: () => (/* binding */ openPreviewModal)
/* harmony export */ });
/* harmony import */ var _comment_list_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comment-list.js */ "./src/comment-list.js");


const previewModalElement = document.querySelector('.big-picture');
const previewModalCloseElement = document.getElementById('picture-cancel')
const previewModalImgElement = previewModalElement.querySelector('.big-picture__img img');
const previewModalLikesElement = previewModalElement.querySelector('.likes-count');
const totalCommentCountElement = previewModalElement.querySelector('.comments-count');
const previewModalDescElement = previewModalElement.querySelector('.social__caption');

const onModalEscKeydown = (evt) => {
    if (evt.code === 'Escape') {
        closePreviewModal();
    }
};

const openPreviewModal = (picture) => {
    previewModalImgElement.setAttribute('src', `http://localhost:80/uploads/pictures/${picture.url}`);
    previewModalLikesElement.textContent = picture.likes;
    totalCommentCountElement.textContent = picture.comments.length;
    previewModalDescElement.textContent = picture.description;
    (0,_comment_list_js__WEBPACK_IMPORTED_MODULE_0__.renderCommentList)(picture.comments);

    previewModalElement.classList.remove('hidden');

    previewModalCloseElement.addEventListener('click', closePreviewModal)
    document.addEventListener('keydown', onModalEscKeydown);
};

const closePreviewModal = () => {
    previewModalElement.classList.add('hidden');
    previewModalCloseElement.removeEventListener('click', closePreviewModal);
    document.removeEventListener('keydown', onModalEscKeydown);
}




/***/ }),

/***/ "./src/start.js":
/*!**********************!*\
  !*** ./src/start.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   restart: () => (/* binding */ restart),
/* harmony export */   start: () => (/* binding */ start)
/* harmony export */ });
/* harmony import */ var _user_page_header_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user/page-header.js */ "./src/user/page-header.js");
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.js */ "./src/api.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./const.js */ "./src/const.js");




const start = () => {
    (0,_user_page_header_js__WEBPACK_IMPORTED_MODULE_0__.updatePageHeader)();
    (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.getData)(_const_js__WEBPACK_IMPORTED_MODULE_2__.Url.EFFECT.GET, (response) => {
        const data = JSON.parse(response);
        localStorage.setItem(_const_js__WEBPACK_IMPORTED_MODULE_2__.AppStorage.EFFECTS, JSON.stringify(data));
    });
}

const restart = () => {

}




/***/ }),

/***/ "./src/upload-form.js":
/*!****************************!*\
  !*** ./src/upload-form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   onDescTextareaInput: () => (/* binding */ onDescTextareaInput),
/* harmony export */   onHashtagsInput: () => (/* binding */ onHashtagsInput),
/* harmony export */   setUploadFormSabmit: () => (/* binding */ setUploadFormSabmit)
/* harmony export */ });
/* harmony import */ var _validation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validation.js */ "./src/validation.js");
/* harmony import */ var _user_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user/util.js */ "./src/user/util.js");
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api.js */ "./src/api.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./const.js */ "./src/const.js");





const MAX_DESCRIPTION_LENGTH = 400;
const uploadFormElement = document.querySelector('#upload-select-image');
const submitBtnElement = uploadFormElement.querySelector('[type=submit]');

/**
 * Обработчик события INPUT к полю описания публикации
 * @param {InputEvent} evt Объект события
 * @return {undefined}
 */
const onDescTextareaInput = (evt) => {
    console.log(evt);
    const valueLength = evt.target.value.length;
    let error = '';

    if (valueLength > MAX_DESCRIPTION_LENGTH) {
        error = `Удалите лишние ${valueLength - MAX_DESCRIPTION_LENGTH} симв.`;
    }

    evt.target.setCustomValidity(error);
    evt.target.reportValidity();
};

const onHashtagsInput = (evt) => {
    const errors = new Set();
    const uniqueHashtags = new Set();

    const errorAddition = {};
    errorAddition[_validation_js__WEBPACK_IMPORTED_MODULE_0__.VALIDATION_ERROR_KEYS[3]] = null;
    errorAddition[_validation_js__WEBPACK_IMPORTED_MODULE_0__.VALIDATION_ERROR_KEYS[5]] = null;

    for (const hashtag of evt.target.value.split(' ')) {
        if (hashtag === '') {
            continue;
        }

        for (const validator of _validation_js__WEBPACK_IMPORTED_MODULE_0__.VALIDATORS) {
            const args = [hashtag, uniqueHashtags, errorAddition];
            if (validator.callback.apply(validator, args)) {
                errors.add(validator.error);
            }
        }
    }

    const resultErrors = [];

    for (const error of errors) {
        if ([_validation_js__WEBPACK_IMPORTED_MODULE_0__.VALIDATION_ERROR_KEYS[3], _validation_js__WEBPACK_IMPORTED_MODULE_0__.VALIDATION_ERROR_KEYS[5]].includes(error)) {
            resultErrors.push(error + errorAddition[error])
        } else {
            resultErrors.push(error);
        }
    }

    evt.target.setCustomValidity(resultErrors.join('\n'));
    evt.target.reportValidity();
};

const setUploadFormSabmit = (onSuccess, onFail) => {
    uploadFormElement.addEventListener('submit', (evt) => {
        evt.preventDefault();

        if (!localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_3__.AppStorage.ACCESS_TOKEN)) {
            return;
        }

        const {user} = JSON.parse(localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_3__.AppStorage.ACCESS_TOKEN));

        const formData = new FormData(uploadFormElement);
        formData.set('user_id', user.id);

        (0,_user_util_js__WEBPACK_IMPORTED_MODULE_1__.blockButton)(submitBtnElement, 'Публикация');
        window.setTimeout(() => {
            (0,_api_js__WEBPACK_IMPORTED_MODULE_2__.sendData)(
                _const_js__WEBPACK_IMPORTED_MODULE_3__.Url.PICTURE.POST,
                () => {
                    (0,_user_util_js__WEBPACK_IMPORTED_MODULE_1__.unblockButton)(submitBtnElement);
                    onSuccess();
                },
                () => {},
                formData
            );
            console.log(formData);
        }, 2000);
    })
};




/***/ }),

/***/ "./src/upload-modal.js":
/*!*****************************!*\
  !*** ./src/upload-modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeUploadModal: () => (/* binding */ closeUploadModal)
/* harmony export */ });
/* harmony import */ var _zoom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./zoom.js */ "./src/zoom.js");
/* harmony import */ var _effects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./effects.js */ "./src/effects.js");
/* harmony import */ var _upload_form_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./upload-form.js */ "./src/upload-form.js");




const uploadModalElement = document.querySelector('.img-upload__overlay');
const uploadModalOpenElement = document.getElementById('upload-file');
const uploadModalCloseElement = document.getElementById('upload-cancel');
const previewImgElement = uploadModalElement.querySelector('.img-upload__preview img');
const scaleControlBiggerElement = uploadModalElement.querySelector('.scale__control--bigger');
const scaleControlSmallerElement = uploadModalElement.querySelector('.scale__control--smaller');
const effectPreviewElements = document.getElementsByClassName('effects__item');
const effectListElement = document.querySelector('.effects__list');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const hashtagsInput = uploadModalElement.querySelector('.text__hashtags');
const descriptionTextarea = uploadModalElement.querySelector('.text__description');

const onModalEscKeydown = (evt) => {
    if (evt.code === 'Escape') {
        closeUploadModal();
    }
};

const updateUploadPreview = (file) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
        previewImgElement.setAttribute('src', reader.result);
        for (const previewElement of effectPreviewElements) {
            previewElement.querySelector('.effects__preview').style.backgroundImage = `url(${reader.result})`;
        }
    });

    reader.readAsDataURL(file);
};

const handlers = [
    {
        element: uploadModalCloseElement,
        event: 'click',
        callback: closeUploadModal
    },
    {
        element: document,
        event: 'keydown',
        callback: onModalEscKeydown
    },
    {
        element: scaleControlBiggerElement,
        event: 'click',
        callback: _zoom_js__WEBPACK_IMPORTED_MODULE_0__.zoomPlus
    },
    {
        element: scaleControlSmallerElement,
        event: 'click',
        callback: _zoom_js__WEBPACK_IMPORTED_MODULE_0__.zoomMinus
    },
    {
        element: effectListElement,
        event: 'change',
        callback: _effects_js__WEBPACK_IMPORTED_MODULE_1__.onEffectsRadioChange
    },
    {
        element: hashtagsInput,
        event: 'input',
        callback: _upload_form_js__WEBPACK_IMPORTED_MODULE_2__.onHashtagsInput
    },
    {
        element: descriptionTextarea,
        event: 'input',
        callback: _upload_form_js__WEBPACK_IMPORTED_MODULE_2__.onDescTextareaInput
    }
];

function openUploadModal(file) {
    updateUploadPreview(file);
    uploadModalElement.classList.remove('hidden');
    document.body.classList.add('modal-open');

    for (const {element, event, callback} of handlers) {
        element.addEventListener(event, callback);
    }

    effectLevelSliderElement.noUiSlider.on('update', _effects_js__WEBPACK_IMPORTED_MODULE_1__.onSliderUpdate);
};

function closeUploadModal() {
    uploadModalElement.classList.add('hidden');
    document.body.classList.remove('modal-open');

    for (const {element, event, callback} of handlers) {
        element.removeEventListener(event, callback);
    }

    effectLevelSliderElement.noUiSlider.off('update');
};

uploadModalOpenElement.addEventListener('change', () => {
    const file = uploadModalOpenElement.files[0];
    openUploadModal(file);
});




/***/ }),

/***/ "./src/user/login-form.js":
/*!********************************!*\
  !*** ./src/user/login-form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setLoginFormSubmit: () => (/* binding */ setLoginFormSubmit)
/* harmony export */ });
/* harmony import */ var _user_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-api.js */ "./src/user/user-api.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ "./src/user/util.js");
// import {renderEffectsList} from '../effect-list.js';



const loginFormElement = document.querySelector('#login-modal form');
const submitBtnElement = loginFormElement.querySelector('[type=submit]');

const setLoginFormSubmit = (onSuccess, onFail) => {
    loginFormElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const formData = new FormData(loginFormElement);

        (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.blockButton)(submitBtnElement, 'Вход');
        window.setTimeout(() => {
            (0,_user_api_js__WEBPACK_IMPORTED_MODULE_0__.createToken)(formData, onSuccess, (errors, LOGIN_FIELDS, loginFormElement) => {
                onFail(errors, LOGIN_FIELDS, loginFormElement);
                (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.unblockButton)(submitBtnElement);
            });
        }, 2000);
    });

    // renderEffectsList();
}




/***/ }),

/***/ "./src/user/login-modal.js":
/*!*********************************!*\
  !*** ./src/user/login-modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeLoginModal: () => (/* binding */ closeLoginModal)
/* harmony export */ });
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



/***/ }),

/***/ "./src/user/logout.js":
/*!****************************!*\
  !*** ./src/user/logout.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setLogoutBtnClick: () => (/* binding */ setLogoutBtnClick)
/* harmony export */ });
/* harmony import */ var _user_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-api.js */ "./src/user/user-api.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ "./src/user/util.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../const.js */ "./src/const.js");




const logoutBtnElement = document.getElementById('logout-btn');

const setLogoutBtnClick = (onSuccess) => {
    logoutBtnElement.addEventListener('click', () => {
        if (!localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_2__.AppStorage.ACCESS_TOKEN)){
            return;
        }

        const {token, id} = JSON.parse(localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_2__.AppStorage.ACCESS_TOKEN));

        (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.blockButton)(logoutBtnElement, 'Выход');
        window.setTimeout(() => {
            (0,_user_api_js__WEBPACK_IMPORTED_MODULE_0__.deleteToken)(token, id, () => {
                onSuccess();
                (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.unblockButton)(logoutBtnElement);
            });
        }, 2000);
    })
}




/***/ }),

/***/ "./src/user/main.js":
/*!**************************!*\
  !*** ./src/user/main.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validation.js */ "./src/user/validation.js");
/* harmony import */ var _signup_form_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./signup-form.js */ "./src/user/signup-form.js");
/* harmony import */ var _login_form_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login-form.js */ "./src/user/login-form.js");
/* harmony import */ var _signup_modal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./signup-modal.js */ "./src/user/signup-modal.js");
/* harmony import */ var _page_header_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./page-header.js */ "./src/user/page-header.js");
/* harmony import */ var _login_modal_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login-modal.js */ "./src/user/login-modal.js");
/* harmony import */ var _logout_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./logout.js */ "./src/user/logout.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../const.js */ "./src/const.js");









(0,_login_form_js__WEBPACK_IMPORTED_MODULE_2__.setLoginFormSubmit)(
    (token) => {
        (0,_login_modal_js__WEBPACK_IMPORTED_MODULE_5__.closeLoginModal)();
        localStorage.setItem(_const_js__WEBPACK_IMPORTED_MODULE_7__.AppStorage.ACCESS_TOKEN, JSON.stringify(token));
        (0,_page_header_js__WEBPACK_IMPORTED_MODULE_4__.updatePageHeader)();
    }, 
    _validation_js__WEBPACK_IMPORTED_MODULE_0__.renderValidationErrors
);

(0,_signup_form_js__WEBPACK_IMPORTED_MODULE_1__.setSignupFormSubmit)(
    _signup_modal_js__WEBPACK_IMPORTED_MODULE_3__.closeSignupModal,
    _validation_js__WEBPACK_IMPORTED_MODULE_0__.renderValidationErrors
);

(0,_logout_js__WEBPACK_IMPORTED_MODULE_6__.setLogoutBtnClick)(() => {
    localStorage.removeItem(_const_js__WEBPACK_IMPORTED_MODULE_7__.AppStorage.ACCESS_TOKEN);
    (0,_page_header_js__WEBPACK_IMPORTED_MODULE_4__.updatePageHeader)();
});


/***/ }),

/***/ "./src/user/page-header.js":
/*!*********************************!*\
  !*** ./src/user/page-header.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updatePageHeader: () => (/* binding */ updatePageHeader)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const.js */ "./src/const.js");


const userAvatarElement = document.querySelector('.wd-user-avatar');
const userNameElement = document.getElementById('username');

const updatePageHeader = () => {
    const accessToken = localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_0__.AppStorage.ACCESS_TOKEN);
    document.body.dataset.auth = Boolean(accessToken);

    if (accessToken) {
        const user = JSON.parse(accessToken).user;
        userAvatarElement.src = _const_js__WEBPACK_IMPORTED_MODULE_0__.Url.UPLOAD.AVATAR + user.avatar;
        userNameElement.textContent = user.name;
    }
}




/***/ }),

/***/ "./src/user/signup-form.js":
/*!*********************************!*\
  !*** ./src/user/signup-form.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setSignupFormSubmit: () => (/* binding */ setSignupFormSubmit)
/* harmony export */ });
/* harmony import */ var _user_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-api.js */ "./src/user/user-api.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ "./src/user/util.js");



const signupFormElement = document.querySelector('#signup-modal form');
const submitBtnElement = signupFormElement.querySelector('[type=submit]');

const setSignupFormSubmit = (onSuccess, onFail) => {
    signupFormElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const formData = new FormData(signupFormElement);

        (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.blockButton)(submitBtnElement, 'Регистрация');
        window.setTimeout(() => {
            (0,_user_api_js__WEBPACK_IMPORTED_MODULE_0__.createUser)(formData, onSuccess, (errors, SIGNUP_FIELDS, signupFormElement) => {
                onFail(errors, SIGNUP_FIELDS, signupFormElement);
                (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.unblockButton)(submitBtnElement);
            });
        }, 2000);
    });
}




/***/ }),

/***/ "./src/user/signup-modal.js":
/*!**********************************!*\
  !*** ./src/user/signup-modal.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeSignupModal: () => (/* binding */ closeSignupModal)
/* harmony export */ });
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



/***/ }),

/***/ "./src/user/user-api.js":
/*!******************************!*\
  !*** ./src/user/user-api.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createToken: () => (/* binding */ createToken),
/* harmony export */   createUser: () => (/* binding */ createUser),
/* harmony export */   deleteToken: () => (/* binding */ deleteToken)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const.js */ "./src/const.js");


const signupFormElement = document.querySelector('#signup-modal form');
const loginFormElement = document.querySelector('#login-modal form');

const SIGNUP_FIELDS = ['email', 'password_hash', 'username', 'avatar'];
const LOGIN_FIELDS = ['email', 'password'];

const createUser = (body, onSuccess, onFail) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', _const_js__WEBPACK_IMPORTED_MODULE_0__.Url.USER.POST);

    xhr.addEventListener('load', () => {
        if (xhr.status === 201) {
            onSuccess();
        } else {
            const errors = JSON.parse(xhr.response);
            onFail(errors, SIGNUP_FIELDS, signupFormElement);
        }
    });

    xhr.send(body);
}

const createToken = (body, onSuccess, onFail) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', _const_js__WEBPACK_IMPORTED_MODULE_0__.Url.ACCESS_TOKEN.POST);

    xhr.addEventListener('load', () => {
        if (xhr.status === 201) {
            const token = JSON.parse(xhr.response);
            onSuccess(token);
        } else {
            const errors = [];
            const response = JSON.parse(xhr.getResponseHeader('Errors'));

            for (const key in response) {
                errors.push({
                    field: key,
                    message: response[key][0]
                });
            }

            onFail(errors, LOGIN_FIELDS, loginFormElement);
        }
    })

    xhr.send(body);
}

const deleteToken = (token, tokenId, onSuccess) => {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${_const_js__WEBPACK_IMPORTED_MODULE_0__.Url.ACCESS_TOKEN.DELETE}${tokenId}`);
    xhr.setRequestHeader('Authorization', `Basic ${btoa(token + ':')}`);

    // FIXME:
    if (xhr.status === 0) { 
        onSuccess();
    }

    xhr.send();
}




/***/ }),

/***/ "./src/user/util.js":
/*!**************************!*\
  !*** ./src/user/util.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blockButton: () => (/* binding */ blockButton),
/* harmony export */   unblockButton: () => (/* binding */ unblockButton)
/* harmony export */ });
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




/***/ }),

/***/ "./src/user/validation.js":
/*!********************************!*\
  !*** ./src/user/validation.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderValidationErrors: () => (/* binding */ renderValidationErrors)
/* harmony export */ });
const clearValidationErrors = (formElement) => {
    for (const inputElement of formElement.querySelectorAll('input')) {
        inputElement.classList.remove('is-invalid');
        inputElement.nextElementSibling.textContent = '';
    }
};

const renderValidationErrors = (errors, fields, formElement) => {
    clearValidationErrors(formElement);

    for (const error of errors) {
        if (fields.includes(error.field)) {
            const inputElement = formElement.querySelector(`[name=${error.field}]`);
            inputElement.classList.add('is-invalid');
            inputElement.nextElementSibling.textContent = error.message;
        }
    }
};




/***/ }),

/***/ "./src/validation.js":
/*!***************************!*\
  !*** ./src/validation.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VALIDATION_ERROR_KEYS: () => (/* binding */ VALIDATION_ERROR_KEYS),
/* harmony export */   VALIDATORS: () => (/* binding */ VALIDATORS)
/* harmony export */ });
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;

const VALIDATION_ERROR_KEYS = [
    'Хэштег должен начинаться c символа "#".',
    'Строка после решётки, должна состоять только из букв и чисел.',
    'Хэштег не может состоять только из одной решётки.',
    `Максимальная длина хэштега - ${MAX_HASHTAG_LENGTH} символов (включая решётку).`,
    'Один и тот же хэштег, не может быть использован дважды.',
    'Нельзя указать больше пяти хэштегов.'
];

const VALIDATORS = [
    {
        callback: (hashtag) => hashtag[0] !== '#',
        error: VALIDATION_ERROR_KEYS[0],
    },
    {
        callback: (hashtag) => hashtag.length > 1 && !/^#[A-Za-zА-Яа-я0-9]{1,19}$/.test(hashtag),
        error: VALIDATION_ERROR_KEYS[1],
    },
    {
        callback: (hashtag) => hashtag === '#',
        error: VALIDATION_ERROR_KEYS[2],
    },
    {
        callback: function (hashtag, uniqueHashtags, errorAddition) {
            if (hashtag.length > MAX_HASHTAG_LENGTH) {
                const message = ` Удалите лишние ${hashtag.length - MAX_HASHTAG_LENGTH} симв.`;
                errorAddition[this.error] = message;
                return true;
            }
            return false;
        },
        error: VALIDATION_ERROR_KEYS[3], 
    },
    {
        callback: function (hashtag, uniqueHashtags, errorAddition) {
            const isNotUnique = uniqueHashtags.has(hashtag.toLowerCase());
            uniqueHashtags.add(hashtag.toLowerCase());
            return isNotUnique;
        },
        error: VALIDATION_ERROR_KEYS[4],
    },
    {
        callback: function (hashtag, uniqueHashtags, errorAddition) {
            if (uniqueHashtags.size > MAX_HASHTAG_COUNT) {
                const message = ` Удалите лишние ${uniqueHashtags.size - MAX_HASHTAG_COUNT} хешт.`;
                errorAddition[this.error] = message;
                return true;
            }
            return false;
        },
        error: VALIDATION_ERROR_KEYS[5],
    },
]




/***/ }),

/***/ "./src/zoom.js":
/*!*********************!*\
  !*** ./src/zoom.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   zoomMinus: () => (/* binding */ zoomMinus),
/* harmony export */   zoomPlus: () => (/* binding */ zoomPlus)
/* harmony export */ });
const uploadModalElement = document.querySelector('.img-upload__overlay');
const scaleControlValueElement = uploadModalElement.querySelector('.scale__control--value');
const scaleControlBiggerElement = uploadModalElement.querySelector('.scale__control--bigger');
const scaleControlSmallerElement = uploadModalElement.querySelector('.scale__control--smaller');
const previewImgElement = uploadModalElement.querySelector('.img-upload__preview img');

const SCALE_CONTROL_MAX_VALUE = 100;
const SCALE_CONTROL_MIN_VALUE = 25;
const SCALE_CONTROL_STEP = 25;

const isMaxValue = (value) => value === SCALE_CONTROL_MAX_VALUE;
const isMinValue = (value) => value === SCALE_CONTROL_MIN_VALUE;

const updateScaleControlElements = () => {
    const value = Number(scaleControlValueElement.value.replace('%', ''));

    scaleControlBiggerElement.style.cursor = isMaxValue(value)
        ? 'not-allowed'
        : 'pointer';
    scaleControlSmallerElement.style.cursor = isMinValue(value)
        ? 'not-allowed'
        : 'pointer';
}

const zoomPlus = () => {
    const value = Number(scaleControlValueElement.value.replace('%', ''));
    if (value < SCALE_CONTROL_MAX_VALUE) {
        const newValue = value + SCALE_CONTROL_STEP;
        scaleControlValueElement.value = newValue + '%';
        previewImgElement.style.transform = `scale(${newValue / 100})`;
        updateScaleControlElements();
    }
};

const zoomMinus = () => {
    const value = Number(scaleControlValueElement.value.replace('%', ''));
    if (value > SCALE_CONTROL_MIN_VALUE) {
        const newValue = value - SCALE_CONTROL_STEP;
        scaleControlValueElement.value = newValue + '%';
        previewImgElement.style.transform = `scale(${newValue / 100})`;
        updateScaleControlElements();
    }
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _picture_list_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./picture-list.js */ "./src/picture-list.js");
/* harmony import */ var _comment_form_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comment-form.js */ "./src/comment-form.js");
/* harmony import */ var _upload_modal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./upload-modal.js */ "./src/upload-modal.js");
/* harmony import */ var _effect_list_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./effect-list.js */ "./src/effect-list.js");
/* harmony import */ var _upload_form_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./upload-form.js */ "./src/upload-form.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./const.js */ "./src/const.js");
/* harmony import */ var _start_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./start.js */ "./src/start.js");
/* harmony import */ var _user_main_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./user/main.js */ "./src/user/main.js");
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./api.js */ "./src/api.js");











(0,_start_js__WEBPACK_IMPORTED_MODULE_6__.start)();

(0,_api_js__WEBPACK_IMPORTED_MODULE_8__.getData)(_const_js__WEBPACK_IMPORTED_MODULE_5__.Url.PICTURE.GET, (response) => {
    const pictures = JSON.parse(response);
    (0,_picture_list_js__WEBPACK_IMPORTED_MODULE_0__.renderPicturesList)(pictures);
});

(0,_effect_list_js__WEBPACK_IMPORTED_MODULE_3__.renderEffectsList)();

(0,_upload_form_js__WEBPACK_IMPORTED_MODULE_4__.setUploadFormSabmit)(
    () => {
        (0,_upload_modal_js__WEBPACK_IMPORTED_MODULE_2__.closeUploadModal)();
        // restart();
});

(0,_comment_form_js__WEBPACK_IMPORTED_MODULE_1__.setCommentFormSabmit)(() => {});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map