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
/* harmony export */   deleteData: () => (/* binding */ deleteData),
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

const getData = (url, onSuccess, parse = false) => {
    const token = getToken();

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('Authorization', `Basic ${btoa(token + ':')}`);

    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            const response = parse ? JSON.parse(xhr.response) : xhr.response;
            onSuccess(response);
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
        } else {
            onFail();
        }
    });

    xhr.send(body);
}

const deleteData = (url, onSuccess, onFail) => {
    const token = getToken();

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', url);
    xhr.setRequestHeader('Authorization', `Basic ${btoa(token + ':')}`);
    xhr.addEventListener('load', () => {
        if ([0, 204].includes(xhr.status)) { 
            onSuccess();
        } else {
            onFail();
        }
    });

    xhr.send();
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
const submitBtnElement = commentFormElement.querySelector('[type=submit]');;
const commentInputElement = commentFormElement.querySelector('.social__footer-text');

const setCommentFormSabmit = (onSuccess, onFail) => {
    commentFormElement.addEventListener('submit', (evt) => {
        evt.preventDefault();

        if (!localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_2__.AppStorage.ACCESS_TOKEN)) {
            return;
        }

        const {user} = JSON.parse(localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_2__.AppStorage.ACCESS_TOKEN));
        const picture = JSON.parse(localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_2__.AppStorage.PICTURE));

        const formData = new FormData(commentFormElement);
        formData.set('user_id', user.id);
        formData.set('picture_id', picture.id);

        (0,_user_util_js__WEBPACK_IMPORTED_MODULE_0__.blockButton)(submitBtnElement, 'Отправка');
        window.setTimeout(() => {
            (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.sendData)(
                _const_js__WEBPACK_IMPORTED_MODULE_2__.Url.COMMENT.POST,
                () => {
                    onSuccess(picture.id);
                    commentInputElement.value = '';
                    (0,_user_util_js__WEBPACK_IMPORTED_MODULE_0__.unblockButton)(submitBtnElement);
                },
                () => {},
                formData
            );
        }, 500);
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
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const.js */ "./src/const.js");


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
        commentElement.querySelector('.social__picture').src = _const_js__WEBPACK_IMPORTED_MODULE_0__.Url.UPLOAD.AVATAR + user.avatar;
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
/* harmony export */   Filter: () => (/* binding */ Filter),
/* harmony export */   Url: () => (/* binding */ Url)
/* harmony export */ });
const scheme = 'https';
const host = '1grey1-api.webdot.pro';


const Url = {
    ACCESS_TOKEN: {
        POST: `${scheme}://${host}/token`,
        DELETE: `${scheme}://${host}/logout/`
    },
    COMMENT: {
        POST: `${scheme}://${host}/comment`
    },
    EFFECT: {
        GET: `${scheme}://${host}/effect`
    },
    LIKE: {
        POST: `${scheme}://${host}/like`,
        DELETE: `${scheme}://${host}/like/`
    },
    PICTURE: {
        GET: `${scheme}://${host}/picture`,
        POST: `${scheme}://${host}/picture`
    },
    USER: {
        POST: `${scheme}://${host}/user`
    },
    UPLOAD: {
        AVATAR: `${scheme}://${host}/uploads/avatars/`,
        PICTURE: `${scheme}://${host}/uploads/pictures/`
    }
};

const AppStorage = {
    ACCESS_TOKEN: `gallery_${btoa('token')}`,
    EFFECTS: `gallery_${btoa('effects')}`,
    PICTURE: `gallery_${btoa('picture')}`
};

const Filter = {
    DEFAULT: 'default',
    RANDOM: 'random',
    DISCUSSED: 'discussed'
};




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


const effectListElement = document.querySelector('.effects__list');
const effectTemlate = document.getElementById('effect-item')
    .content
    .querySelector('.effects__item');

const renderEffectsList = () => {
    const effects = JSON.parse(localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_0__.AppStorage.EFFECTS));

    if (!localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_0__.AppStorage.ACCESS_TOKEN)) {
        return;
    }

    for (const {name: effectName, id: effectId} of effects) {
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
/* harmony export */   onSliderUpdate: () => (/* binding */ onSliderUpdate),
/* harmony export */   setImageEffect: () => (/* binding */ setImageEffect)
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
    const effect = EFFECTS.find((effect) => effect.name === effectName);

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

const setImageEffect = (pictureElement, picture) => {
    const effects = JSON.parse(localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_0__.AppStorage.EFFECTS));
    const filter = effects.find((effect) => effect.id === picture.effect_id);
    const pictureImgElement = pictureElement.querySelector('img');
    if (picture.effect_level !== null) {
        pictureImgElement.style.filter = `${filter.css_filter}(${picture.effect_level}${filter.unit ?? ''})`;
    }else {
        pictureImgElement.style.filter = '';
    }
}




/***/ }),

/***/ "./src/enum.js":
/*!*********************!*\
  !*** ./src/enum.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MessageType: () => (/* binding */ MessageType)
/* harmony export */ });
const MessageType = {
    ERROR: 'error',
    SUCCESS: 'success'
}




/***/ }),

/***/ "./src/filters.js":
/*!************************!*\
  !*** ./src/filters.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setFilterBtnClick: () => (/* binding */ setFilterBtnClick)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./src/util.js");
/* harmony import */ var _picture_list_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./picture-list.js */ "./src/picture-list.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./const.js */ "./src/const.js");




const filterList = document.querySelector('.img-filters--inactive');
const filtersFormElement = document.querySelector('.img-filters__form');

const ubdateBtnClassList = (buttonId) => { 
    Object.values(_const_js__WEBPACK_IMPORTED_MODULE_2__.Filter).forEach((idFilter) => {
        document
            .querySelector(`#filter-${idFilter}`)
            .className = 'img-filters__button';
    });

    document
        .querySelector(`#${buttonId}`)
        .classList.add('img-filters__button--active'); 
}

const setFilterBtnClick = () => {
    filterList.style.opacity = '1';

    filtersFormElement.addEventListener('click', (evt) => {
        const filterName = evt.target.id.split('-')[1];
        ubdateBtnClassList(evt.target.id);

        switch (filterName) {
            case _const_js__WEBPACK_IMPORTED_MODULE_2__.Filter.DEFAULT:
                (0,_picture_list_js__WEBPACK_IMPORTED_MODULE_1__.renderPicturesList)(_picture_list_js__WEBPACK_IMPORTED_MODULE_1__.pictures.sort((a, b) => a.id - b.id), true);
                break;

            case _const_js__WEBPACK_IMPORTED_MODULE_2__.Filter.RANDOM:
                (0,_picture_list_js__WEBPACK_IMPORTED_MODULE_1__.renderPicturesList)(randomPictureArray(_picture_list_js__WEBPACK_IMPORTED_MODULE_1__.pictures), true);
                break;

            case _const_js__WEBPACK_IMPORTED_MODULE_2__.Filter.DISCUSSED:
                (0,_picture_list_js__WEBPACK_IMPORTED_MODULE_1__.renderPicturesList)(_picture_list_js__WEBPACK_IMPORTED_MODULE_1__.pictures.sort((a, b) => b.comments.length - a.comments.length), true);
                break;
        }
    });
}

const randomPictureArray = (pictures) => {
    const uniqueObject = new Set();

    while (Array.from(uniqueObject).length !== pictures.length) {
        uniqueObject.add((0,_util_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayElement)(pictures));
    }

    return Array.from(uniqueObject);
};




/***/ }),

/***/ "./src/hashtag.js":
/*!************************!*\
  !*** ./src/hashtag.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   showPictureHastags: () => (/* binding */ showPictureHastags)
/* harmony export */ });
const showPictureHastags = (hashtags) => {
    const message = hashtags.length ? `: ${hashtags.join(', ')}` : ' отсутствуют';
    alert(`Хештаги${message}`);
};




/***/ }),

/***/ "./src/likes.js":
/*!**********************!*\
  !*** ./src/likes.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setLikesCountClick: () => (/* binding */ setLikesCountClick),
/* harmony export */   updateLikesCount: () => (/* binding */ updateLikesCount)
/* harmony export */ });
/* harmony import */ var _user_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user/util.js */ "./src/user/util.js");
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.js */ "./src/api.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./const.js */ "./src/const.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storage.js */ "./src/storage.js");





const submitBtnElement = document.querySelector('.likes-count');
const previewModalLikesElement = document.querySelector('.likes-count');

const getLike = (likes, userId, pictureId) => {

    return likes.find((like) => {
        return like.user_id == userId && like.picture_id == pictureId;
    })
};

const updateLikesCount = (likes) => {
    previewModalLikesElement.textContent = likes.length;
    const picture = JSON.parse(localStorage.getItem('gallery_cGljdHVyZQ=='));
    const {user} = JSON.parse(localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_2__.AppStorage.ACCESS_TOKEN));

    if (getLike(picture.likes, user.id, picture.id)) {
        submitBtnElement.classList.add('likes-count--active');
    } else {
        submitBtnElement.classList.remove('likes-count--active');
    }
}

const setLike = (onSuccess, userId, pictureId) => {
    const formData = new FormData();
    formData.set('user_id', userId);
    formData.set('picture_id', pictureId);
    
    (0,_user_util_js__WEBPACK_IMPORTED_MODULE_0__.blockButton)(submitBtnElement);
    window.setTimeout(() => {
        (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.sendData)(
            _const_js__WEBPACK_IMPORTED_MODULE_2__.Url.LIKE.POST,
            () => {
                onSuccess();
                (0,_user_util_js__WEBPACK_IMPORTED_MODULE_0__.unblockButton)(submitBtnElement);
            },
            () => {
                (0,_user_util_js__WEBPACK_IMPORTED_MODULE_0__.unblockButton)(submitBtnElement);
            },
            formData
        );
    }, 500);
}

const removeLike = (onSuccess, likeId) => {
    ;(0,_user_util_js__WEBPACK_IMPORTED_MODULE_0__.blockButton)(submitBtnElement);
    window.setTimeout(() => {
        (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.deleteData)(
            _const_js__WEBPACK_IMPORTED_MODULE_2__.Url.LIKE.DELETE + likeId,
            () => {
                onSuccess();
                (0,_user_util_js__WEBPACK_IMPORTED_MODULE_0__.unblockButton)(submitBtnElement);
            },
            () => {
                console.log(3);
                (0,_user_util_js__WEBPACK_IMPORTED_MODULE_0__.unblockButton)(submitBtnElement);
            }
        )
    }, 500)
}

const setLikesCountClick = (onSuccess) => {
    submitBtnElement.addEventListener('click', (evt) => {
        evt.preventDefault();
        if (!localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_2__.AppStorage.ACCESS_TOKEN)) {
            return;
        }

        const {user} = JSON.parse(localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_2__.AppStorage.ACCESS_TOKEN));
        const picture = JSON.parse(localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_2__.AppStorage.PICTURE));

        if (getLike(picture.likes, user.id, picture.id)) {
            const likeId = picture.likes.find(like => like.user_id === user.id).id;
            removeLike(
                () => {
                    onSuccess(picture.id);
                },
                likeId
            );
        } else {
            setLike(
                () => {
                    onSuccess(picture.id);
                },
                user.id,
                picture.id
            );
        }
    });

};




/***/ }),

/***/ "./src/message.js":
/*!************************!*\
  !*** ./src/message.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderProgressBar: () => (/* binding */ renderProgressBar)
/* harmony export */ });
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




/***/ }),

/***/ "./src/picture-list.js":
/*!*****************************!*\
  !*** ./src/picture-list.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearPictureList: () => (/* binding */ clearPictureList),
/* harmony export */   pictures: () => (/* binding */ pictures),
/* harmony export */   renderPicturesList: () => (/* binding */ renderPicturesList),
/* harmony export */   updatePicture: () => (/* binding */ updatePicture)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const.js */ "./src/const.js");
/* harmony import */ var _preview_modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./preview-modal.js */ "./src/preview-modal.js");
/* harmony import */ var _effects_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./effects.js */ "./src/effects.js");



let pictures = [];
const pictureListElement = document.querySelector('.pictures');
const pictureTemplate = document.getElementById('picture')
    .content
    .querySelector('.picture');

const updatePictureCounters = (pictureElement, {likes, comments}) => {
    pictureElement.querySelector('.picture__likes').textContent = likes.length;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
}

const clearPictureList = () => {
    const pictureArray = Array.from(document.getElementsByClassName('picture'));
    pictureArray.forEach((picture) => picture.remove());
}

const onPictureElementClick = (evt) => {
    const pictureElement = evt.target.closest('.picture');
    if (pictureElement) {
        const picture = pictures.find(picture => picture.id === +pictureElement.dataset.id);
        (0,_preview_modal_js__WEBPACK_IMPORTED_MODULE_1__.openPreviewModal)(picture);
    }
}

const renderPicturesList = (array, sort = false) => {
    if (sort) {
        clearPictureList();
    }

    if (pictures.length <= array.length) {
        pictures = array.slice();
    }

    for (const picture of pictures) {
        const pictureElement = pictureTemplate.cloneNode(true);
        pictureElement.dataset.id = picture.id;

        pictureElement.querySelector('.picture__img').setAttribute('src', _const_js__WEBPACK_IMPORTED_MODULE_0__.Url.UPLOAD.PICTURE + picture.url);
        updatePictureCounters(pictureElement, picture);
        (0,_effects_js__WEBPACK_IMPORTED_MODULE_2__.setImageEffect)(pictureElement, picture);
        pictureListElement.append(pictureElement);
    }

    pictureListElement.addEventListener('click', onPictureElementClick);
}

const updatePicture = (picture) => {
    const pictureElement = document.querySelector(`.picture[data-id="${picture.id}"]`);

    if (pictureElement) {
        updatePictureCounters(pictureElement, picture);
    }
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
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./const.js */ "./src/const.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage.js */ "./src/storage.js");
/* harmony import */ var _likes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./likes.js */ "./src/likes.js");
/* harmony import */ var _hashtag_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hashtag.js */ "./src/hashtag.js");
/* harmony import */ var _effects_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./effects.js */ "./src/effects.js");







const previewModalElement = document.querySelector('.big-picture');
const previewModalCloseElement = document.getElementById('picture-cancel');
const userAvatarElement = previewModalElement.querySelector('#comment-form .social__picture');
const previewAvatarElement = document.querySelector('.social__picture');
const previewModalImgElement = previewModalElement.querySelector('.big-picture__img img');
const totalCommentCountElement = previewModalElement.querySelector('.comments-count');
const previewModalDescElement = previewModalElement.querySelector('.social__caption');
const hashtagBtnElement = previewModalElement.querySelector('.hashtag-btn');

const onModalEscKeydown = (evt) => {
    if (evt.code === 'Escape') {
        closePreviewModal();
    }
};

const onHashtagBtnClick = () => {
    const {hashtags} = JSON.parse(localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_1__.AppStorage.PICTURE));
    (0,_hashtag_js__WEBPACK_IMPORTED_MODULE_4__.showPictureHastags)(hashtags.map(hashtag => hashtag.name));
}

const openPreviewModal = (picture) => {
    localStorage.setItem(_const_js__WEBPACK_IMPORTED_MODULE_1__.AppStorage.PICTURE, JSON.stringify(picture));
    (0,_effects_js__WEBPACK_IMPORTED_MODULE_5__.setImageEffect)(previewModalElement, picture);
    (0,_likes_js__WEBPACK_IMPORTED_MODULE_3__.updateLikesCount)(picture.likes);

    // previewModalImgElement.setAttribute('src', Url.UPLOAD.PICTURE + picture.url);
    previewModalImgElement.src = _const_js__WEBPACK_IMPORTED_MODULE_1__.Url.UPLOAD.PICTURE + picture.url;
    totalCommentCountElement.textContent = picture.comments;
    previewModalDescElement.textContent = picture.description;

    previewAvatarElement.src = _const_js__WEBPACK_IMPORTED_MODULE_1__.Url.UPLOAD.AVATAR + picture.user.avatar;
    userAvatarElement.src = _const_js__WEBPACK_IMPORTED_MODULE_1__.Url.UPLOAD.AVATAR + (0,_storage_js__WEBPACK_IMPORTED_MODULE_2__.getUser)().avatar;
    (0,_comment_list_js__WEBPACK_IMPORTED_MODULE_0__.renderCommentList)(picture.comments);

    previewModalElement.classList.remove('hidden');
    previewModalCloseElement.addEventListener('click', closePreviewModal);
    document.addEventListener('keydown', onModalEscKeydown);
    hashtagBtnElement.addEventListener('click', onHashtagBtnClick);
};

const closePreviewModal = () => {
    previewModalElement.classList.add('hidden');
    previewModalCloseElement.removeEventListener('click', closePreviewModal);
    document.removeEventListener('keydown', onModalEscKeydown);
    hashtagBtnElement.removeEventListener('click', onHashtagBtnClick);
}




/***/ }),

/***/ "./src/start.js":
/*!**********************!*\
  !*** ./src/start.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   start: () => (/* binding */ start)
/* harmony export */ });
/* harmony import */ var _user_page_header_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user/page-header.js */ "./src/user/page-header.js");
/* harmony import */ var _effect_list_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./effect-list.js */ "./src/effect-list.js");
/* harmony import */ var _picture_list_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./picture-list.js */ "./src/picture-list.js");
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api.js */ "./src/api.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./const.js */ "./src/const.js");
/* harmony import */ var _filters__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./filters */ "./src/filters.js");







const start = () => {
    (0,_user_page_header_js__WEBPACK_IMPORTED_MODULE_0__.updatePageHeader)();

    (0,_api_js__WEBPACK_IMPORTED_MODULE_3__.getData)(_const_js__WEBPACK_IMPORTED_MODULE_4__.Url.EFFECT.GET, (response) => {
        const data = JSON.parse(response);
        localStorage.setItem(_const_js__WEBPACK_IMPORTED_MODULE_4__.AppStorage.EFFECTS, JSON.stringify(data));
        (0,_effect_list_js__WEBPACK_IMPORTED_MODULE_1__.renderEffectsList)();
    });

    (0,_api_js__WEBPACK_IMPORTED_MODULE_3__.getData)(_const_js__WEBPACK_IMPORTED_MODULE_4__.Url.PICTURE.GET, (response) => {
        (0,_picture_list_js__WEBPACK_IMPORTED_MODULE_2__.renderPicturesList)(JSON.parse(response));
        (0,_filters__WEBPACK_IMPORTED_MODULE_5__.setFilterBtnClick)();
    });
}




/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCurrentPicture: () => (/* binding */ getCurrentPicture),
/* harmony export */   getUser: () => (/* binding */ getUser)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const.js */ "./src/const.js");


const getUser = () => {
    const token = localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_0__.AppStorage.ACCESS_TOKEN);
    return JSON.parse(token).user;
}

const getCurrentPicture = () => {
    console.log(JSON.parse(localStorage.getItem('gallery_cGljdHVyZQ==')));
    return JSON.parse(localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_0__.AppStorage.PICTURE));
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
/* harmony export */   setUploadFormSubmit: () => (/* binding */ setUploadFormSubmit)
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

const setUploadFormSubmit = (onSuccess, onFail) => {
    uploadFormElement.addEventListener('submit', (evt) => {
        evt.preventDefault();

        if (!localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_3__.AppStorage.ACCESS_TOKEN)) {
            return;
        }

        const {user} = JSON.parse(localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_3__.AppStorage.ACCESS_TOKEN));

        const formData = new FormData(uploadFormElement);
        formData.set('user_id', user.id);

        (0,_user_util_js__WEBPACK_IMPORTED_MODULE_1__.blockButton)(submitBtnElement, 'Публикация', false);
        window.setTimeout(() => {
            (0,_api_js__WEBPACK_IMPORTED_MODULE_2__.sendData)(
                _const_js__WEBPACK_IMPORTED_MODULE_3__.Url.PICTURE.POST,
                () => {
                    (0,_user_util_js__WEBPACK_IMPORTED_MODULE_1__.unblockButton)(submitBtnElement);
                    onSuccess();
                },
                () => {
                    onFail();
                },
                formData
            );
        }, 0);
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
    uploadModalOpenElement.value = '';
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



const loginFormElement = document.querySelector('#login-modal form');
const submitBtnElement = loginFormElement.querySelector('[type=submit]');

const setLoginFormSubmit = (onSuccess, onFail) => {
    loginFormElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const formData = new FormData(loginFormElement);

        (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.blockButton)(submitBtnElement, 'Вход');
        window.setTimeout(() => {
            (0,_user_api_js__WEBPACK_IMPORTED_MODULE_0__.createToken)(
                formData,
                (token) => {
                    onSuccess(token);
                    (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.unblockButton)(submitBtnElement);
                },
                (errors, LOGIN_FIELDS, loginFormElement) => {
                    onFail(errors, LOGIN_FIELDS, loginFormElement);
                    (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.unblockButton)(submitBtnElement);
                }
            );
        }, 2000);
    });
};




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
/* harmony import */ var _picture_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../picture-list */ "./src/picture-list.js");





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
                (0,_picture_list__WEBPACK_IMPORTED_MODULE_3__.clearPictureList)();
                document.querySelector('.img-filters--inactive').style.opacity = '0';
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
/* harmony import */ var _start_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../start.js */ "./src/start.js");










(0,_login_form_js__WEBPACK_IMPORTED_MODULE_2__.setLoginFormSubmit)(
    (token) => {
        (0,_login_modal_js__WEBPACK_IMPORTED_MODULE_5__.closeLoginModal)();
        localStorage.setItem(_const_js__WEBPACK_IMPORTED_MODULE_7__.AppStorage.ACCESS_TOKEN, JSON.stringify(token));
        (0,_page_header_js__WEBPACK_IMPORTED_MODULE_4__.updatePageHeader)();
        (0,_start_js__WEBPACK_IMPORTED_MODULE_8__.start)();
    },
    _validation_js__WEBPACK_IMPORTED_MODULE_0__.renderValidationErrors
);
    
(0,_signup_form_js__WEBPACK_IMPORTED_MODULE_1__.setSignupFormSubmit)(
    () => {
        (0,_signup_modal_js__WEBPACK_IMPORTED_MODULE_3__.closeSignupModal)();
        (0,_start_js__WEBPACK_IMPORTED_MODULE_8__.start)();
    },
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
            (0,_user_api_js__WEBPACK_IMPORTED_MODULE_0__.createUser)(
                formData,
                () => {
                    onSuccess();
                    (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.unblockButton)(submitBtnElement);
                },
                (errors, SIGNUP_FIELDS, signupFormElement) => {
                    onFail(errors, SIGNUP_FIELDS, signupFormElement);
                    (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.unblockButton)(submitBtnElement);
                }
            );
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

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRandomArrayElement: () => (/* binding */ getRandomArrayElement),
/* harmony export */   getRandomInt: () => (/* binding */ getRandomInt)
/* harmony export */ });
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomArrayElement = (array) => {
    return array[getRandomInt(0, array.length - 1)];
}




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
/* harmony import */ var _comment_form_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comment-form.js */ "./src/comment-form.js");
/* harmony import */ var _comment_list_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comment-list.js */ "./src/comment-list.js");
/* harmony import */ var _likes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./likes.js */ "./src/likes.js");
/* harmony import */ var _upload_modal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./upload-modal.js */ "./src/upload-modal.js");
/* harmony import */ var _upload_form_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./upload-form.js */ "./src/upload-form.js");
/* harmony import */ var _picture_list_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./picture-list.js */ "./src/picture-list.js");
/* harmony import */ var _start_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./start.js */ "./src/start.js");
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./api.js */ "./src/api.js");
/* harmony import */ var _message_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./message.js */ "./src/message.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./const.js */ "./src/const.js");
/* harmony import */ var _enum_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./enum.js */ "./src/enum.js");
/* harmony import */ var _user_main_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./user/main.js */ "./src/user/main.js");















(0,_start_js__WEBPACK_IMPORTED_MODULE_6__.start)();

(0,_upload_form_js__WEBPACK_IMPORTED_MODULE_4__.setUploadFormSubmit)(() => {
    (0,_upload_modal_js__WEBPACK_IMPORTED_MODULE_3__.closeUploadModal)();
    (0,_message_js__WEBPACK_IMPORTED_MODULE_8__.renderProgressBar)(_enum_js__WEBPACK_IMPORTED_MODULE_10__.MessageType.SUCCESS, () => {
        (0,_api_js__WEBPACK_IMPORTED_MODULE_7__.getData)(_const_js__WEBPACK_IMPORTED_MODULE_9__.Url.PICTURE.GET, (response) => {
            (0,_picture_list_js__WEBPACK_IMPORTED_MODULE_5__.renderPicturesList)(JSON.parse(response), true);
        });
    });
});

(0,_comment_form_js__WEBPACK_IMPORTED_MODULE_0__.setCommentFormSabmit)((pictureId) => {
    (0,_api_js__WEBPACK_IMPORTED_MODULE_7__.getData)(_const_js__WEBPACK_IMPORTED_MODULE_9__.Url.PICTURE.GET + `/${pictureId}`, (picture) => {
        localStorage.setItem(_const_js__WEBPACK_IMPORTED_MODULE_9__.AppStorage.PICTURE, JSON.stringify(picture));
        const indexPicture = _picture_list_js__WEBPACK_IMPORTED_MODULE_5__.pictures.indexOf(_picture_list_js__WEBPACK_IMPORTED_MODULE_5__.pictures.find((picture) => picture.id === pictureId));
        _picture_list_js__WEBPACK_IMPORTED_MODULE_5__.pictures.splice(indexPicture, 1, picture);
        (0,_picture_list_js__WEBPACK_IMPORTED_MODULE_5__.updatePicture)(picture);
        (0,_comment_list_js__WEBPACK_IMPORTED_MODULE_1__.renderCommentList)(picture.comments);
    }, true);
});

(0,_likes_js__WEBPACK_IMPORTED_MODULE_2__.setLikesCountClick)((pictureId) => {
    (0,_api_js__WEBPACK_IMPORTED_MODULE_7__.getData)(_const_js__WEBPACK_IMPORTED_MODULE_9__.Url.PICTURE.GET + `/${pictureId}`, (picture) => {
        localStorage.setItem(_const_js__WEBPACK_IMPORTED_MODULE_9__.AppStorage.PICTURE, JSON.stringify(picture));
        const indexPicture = _picture_list_js__WEBPACK_IMPORTED_MODULE_5__.pictures.indexOf(_picture_list_js__WEBPACK_IMPORTED_MODULE_5__.pictures.find((picture) => picture.id === pictureId));
        _picture_list_js__WEBPACK_IMPORTED_MODULE_5__.pictures.splice(indexPicture, 1, picture);
        (0,_picture_list_js__WEBPACK_IMPORTED_MODULE_5__.updatePicture)(picture);
        (0,_likes_js__WEBPACK_IMPORTED_MODULE_2__.updateLikesCount)(picture.likes);
    }, true);
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map