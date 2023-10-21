/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/comment-list.js":
/*!*****************************!*\
  !*** ./src/comment-list.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
    for (const comment of comments.slice(from, to)) {
        const commentElement = commentTemlate.cloneNode(true);
        commentElement.querySelector('.social__text').textContent = comment.message;
        commentElement.querySelector('.social__picture').setAttribute('src', comment.user.avatar);
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   COMMENT_MESSAGES: () => (/* binding */ COMMENT_MESSAGES),
/* harmony export */   EFFECTS: () => (/* binding */ EFFECTS),
/* harmony export */   PICTURE_DESRIPTIONS: () => (/* binding */ PICTURE_DESRIPTIONS),
/* harmony export */   USER_NAMES: () => (/* binding */ USER_NAMES)
/* harmony export */ });
const PICTURE_DESRIPTIONS = [
    'desription-1',
    'desription-2',
    'desription-3',
    'desription-4',
    'desription-5'
];

const USER_NAMES = [
    'name-1',
    'name-2',
    'name-3',
    'name-4',
    'name-5',
    'name-6'
];

const COMMENT_MESSAGES = [
    'message-1',
    'message-2',
    'message-3',
    'message-4',
    'message-5'
];

const EFFECTS = [
    'none',
    'chrome',
    'sepia',
    'marvin',
    'phobos',
    'heat'
];




/***/ }),

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generatePictures: () => (/* binding */ generatePictures)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const.js */ "./src/const.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ "./src/util.js");



const MAX_COMMENT_COUNT = 20;
const MAX_LIKE_COUNT = 200;

const usedComentIds = [];
const usedPictureIds = [];

const generateUser = () => ({
    id: (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(1, 6),
    name: (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomArrayElement)(_const_js__WEBPACK_IMPORTED_MODULE_0__.USER_NAMES),
    avatar: `./img/avatars/1600w-WsQ560IKaR0.webp`
});

const generateComment = (maxPictureId) => {
    let comentId;
    do {
        comentId = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(1, maxPictureId * MAX_COMMENT_COUNT);
    } while (usedComentIds.includes(comentId));
    usedComentIds.push(comentId);

    return {
        id: comentId,
        message: (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomArrayElement)(_const_js__WEBPACK_IMPORTED_MODULE_0__.COMMENT_MESSAGES),
        user: generateUser()
    }
};

const generatePicture = (maxPictureId) => {
    let picturesId;
    do {
        picturesId = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(1, maxPictureId);
    } while (usedPictureIds.includes(picturesId));
    usedPictureIds.push(picturesId);

    const comments = [];
    for (let i = 0; i < (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(5, MAX_COMMENT_COUNT); i++) {
        comments.push(generateComment(maxPictureId));
    }

    return {
        id: picturesId,
        url: `./photos/${(0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(1, 25)}.jpg`,
        description: (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomArrayElement)(_const_js__WEBPACK_IMPORTED_MODULE_0__.PICTURE_DESRIPTIONS),
        likes: (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, MAX_LIKE_COUNT),
        comments: comments
    }
};

const generatePictures = (count) => {
    const pictures = [];
    for (let i = 0; i < count; i++) {
        pictures.push(generatePicture(count));
    }

    return pictures;
};




/***/ }),

/***/ "./src/effects-list.js":
/*!*****************************!*\
  !*** ./src/effects-list.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderEffectsList: () => (/* binding */ renderEffectsList)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const.js */ "./src/const.js");


const previewImgElement = document.querySelector('.img-upload__preview img');
const effectListElement = document.querySelector('.effects__list');
const effectTemlate = document.getElementById('effect-item')
    .content
    .querySelector('.effects__item');

const  renderEffectsList = () => {
    for (const effect of _const_js__WEBPACK_IMPORTED_MODULE_0__.EFFECTS) {
        const effectElement = effectTemlate.cloneNode(true);

        if (effect === 'none') {
            effectElement.querySelector('.effects__radio').setAttribute('checked', '');
        }

        effectElement.querySelector('.effects__radio').setAttribute('id', `effect-${effect}`);
        effectElement.querySelector('.effects__label').setAttribute('for', `effect-${effect}`);
        effectElement.querySelector('.effects__preview').classList.add(`effects__preview--${effect}`);
        effectListElement.append(effectElement);

        effectElement.addEventListener('click', () => {
            previewImgElement.setAttribute('class', '');
            previewImgElement.classList.add('class', `effects__preview--${effect}`);
        });
    }
}




/***/ }),

/***/ "./src/pictures-list.js":
/*!******************************!*\
  !*** ./src/pictures-list.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderPicturesList: () => (/* binding */ renderPicturesList)
/* harmony export */ });
/* harmony import */ var _preview_modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./preview-modal.js */ "./src/preview-modal.js");


// const pictureTemplateElement = document.getElementById('picture');
// const pictureTemplateContent = pictureTemplateElement.content;
// const pictureTemplate = pictureTemplateContent.querySelector('.picture');

const pictureListElement = document.querySelector('.pictures');
const pictureTemplate = document.getElementById('picture')
    .content
    .querySelector('.picture');

const renderPicturesList = (pictures) => {
    for (const picture of pictures) {
        const pictureElement = pictureTemplate.cloneNode(true);

        // const pictureImgElement = pictureElement.querySelector('.picture__img');
        // pictureImgElement.setAttribute('src', picture.url);

        pictureElement.querySelector('.picture__img').setAttribute('src', picture.url);
        pictureElement.querySelector('.picture__likes').textContent = picture.likes;
        pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
        pictureListElement.append(pictureElement);

        pictureElement.addEventListener('click', function () {
            (0,_preview_modal_js__WEBPACK_IMPORTED_MODULE_0__.openPreviewModal)(picture);
        });
    }
}




/***/ }),

/***/ "./src/preview-modal.js":
/*!******************************!*\
  !*** ./src/preview-modal.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
    previewModalImgElement.setAttribute('src', picture.url);
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

/***/ "./src/upload-form.js":
/*!****************************!*\
  !*** ./src/upload-form.js ***!
  \****************************/
/***/ (() => {

const uploadModalElement = document.querySelector('.img-upload__overlay');
const hashtagsInput = uploadModalElement.querySelector('.text__hashtags');
const descriptionTextarea = uploadModalElement.querySelector('.text__description');

const MAX_DESCRIPTION_LENGTH = 400;
const MAX_HASHTAGS_LENGTH = 20;
const MAX_HASHTAGS_COUNT = 5;

if (descriptionTextarea) {
    descriptionTextarea.addEventListener('input', () => {
        const valueLength = descriptionTextarea.value.length;

        let error = '';
        if (valueLength > MAX_DESCRIPTION_LENGTH) {
            error = `Удалите лишние ${valueLength - MAX_DESCRIPTION_LENGTH} симв.`;
        }

        descriptionTextarea.setCustomValidity(error);
        descriptionTextarea.reportValidity();
    });
}

if (hashtagsInput) {
    hashtagsInput.addEventListener('input', () => {
        const checkHashtags = hashtagsInput.value.split(' ')
        let error = '';
        if (checkHashtags.length > MAX_HASHTAGS_COUNT) {
            error = `Удалите лишние ${checkHashtags.length - MAX_HASHTAGS_COUNT} хешт.`;
        }

        for (const hashtag of checkHashtags) {
            if (hashtag[0] !== '#') {
                error = `Добавте хештег в начало`;
            }

            if (hashtag.length === 1 && hashtag[0] === '#') {
                error = `Напишите хештег`;
            }

            if (hashtag.length > 20) {
                error = `Удалите лишние ${hashtag.length - MAX_HASHTAGS_LENGTH} симв.`;
            }

            // if (checkHashtags.includes(hashtag)) {
            //     error = `Удалите повторяющийся хештег (${hashtag})`;
            // }
        }

        hashtagsInput.setCustomValidity(error);
        hashtagsInput.reportValidity();

})
}

/***/ }),

/***/ "./src/upload-modal.js":
/*!*****************************!*\
  !*** ./src/upload-modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _zoom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./zoom.js */ "./src/zoom.js");


const uploadModalElement = document.querySelector('.img-upload__overlay');
const uploadModalOpenElement = document.getElementById('upload-file');
const uploadModalCloseElement = document.getElementById('upload-cancel');
const previewImgElement = uploadModalElement.querySelector('.img-upload__preview img');
const scaleControlBiggerElement = uploadModalElement.querySelector('.scale__control--bigger');
const scaleControlSmallerElement = uploadModalElement.querySelector('.scale__control--smaller');
const effectPreviewElements = document.getElementsByClassName('effects__item');

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

const openUploadModal = (file) => {
    updateUploadPreview(file);
    uploadModalElement.classList.remove('hidden');
    document.body.classList.add('modal-open');

    uploadModalCloseElement.addEventListener('click', closeUploadModal);
    document.addEventListener('keydown', onModalEscKeydown);
    scaleControlBiggerElement.addEventListener('click', _zoom_js__WEBPACK_IMPORTED_MODULE_0__.zoomPlus);
    scaleControlSmallerElement.addEventListener('click', _zoom_js__WEBPACK_IMPORTED_MODULE_0__.zoomMinus);
};

const closeUploadModal = () => {
    uploadModalElement.classList.add('hidden');
    document.body.classList.remove('modal-open');

    uploadModalCloseElement.removeEventListener('click', closeUploadModal);
    document.removeEventListener('keydown', onModalEscKeydown);

    scaleControlBiggerElement.removeEventListener('click', _zoom_js__WEBPACK_IMPORTED_MODULE_0__.zoomPlus);
    scaleControlSmallerElement.removeEventListener('click', _zoom_js__WEBPACK_IMPORTED_MODULE_0__.zoomMinus);
};

uploadModalOpenElement.addEventListener('change', () => {
    const file = uploadModalOpenElement.files[0];
    openUploadModal(file);
});


/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "./src/zoom.js":
/*!*********************!*\
  !*** ./src/zoom.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

const SCALE_CONTROL_MAX_VALUE = 200;
const SCALE_CONTROL_MIN_VALUE = 25;
const SCALE_CONTROL_STEP = 25;

const isMaxValue = (value) => value === SCALE_CONTROL_MAX_VALUE;
const isMinValue = (value) => value === SCALE_CONTROL_MIN_VALUE;

const updateScaleControlElements = () => {
    const value = Number(scaleControlValueElement.value.replace('%', ''));
    // if (isMaxValue(value)) {
    //     scaleControlBiggerElement.style.cursor = 'not-allowed';
    // } else {
    //     scaleControlBiggerElement.style.cursor = 'pointer';
    // }
    
    // if (isMinValue(value)) {
    //     scaleControlSmallerElement.style.cursor = 'not-allowed';
    // } else {
    //     scaleControlSmallerElement.style.cursor = 'pointer';
    // }

    scaleControlBiggerElement.style.cursor = isMaxValue(value) ? 'not-allowed' : 'pointer';
    scaleControlSmallerElement.style.cursor = isMinValue(value) ? 'not-allowed' : 'pointer';
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data.js */ "./src/data.js");
/* harmony import */ var _pictures_list_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pictures-list.js */ "./src/pictures-list.js");
/* harmony import */ var _effects_list_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./effects-list.js */ "./src/effects-list.js");
/* harmony import */ var _upload_modal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./upload-modal.js */ "./src/upload-modal.js");
/* harmony import */ var _upload_form_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./upload-form.js */ "./src/upload-form.js");
/* harmony import */ var _upload_form_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_upload_form_js__WEBPACK_IMPORTED_MODULE_4__);






const pictures = (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.generatePictures)(50);
(0,_pictures_list_js__WEBPACK_IMPORTED_MODULE_1__.renderPicturesList)(pictures);
(0,_effects_list_js__WEBPACK_IMPORTED_MODULE_2__.renderEffectsList)();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map