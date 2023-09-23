/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   COMMENT_MESSAGES: () => (/* binding */ COMMENT_MESSAGES),
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




/***/ }),

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generatePictures: () => (/* binding */ generatePictures)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const.js */ "./src/const.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ "./src/util.js");



const MAX_COMMENT_COUNT = 10;
const MAX_LIKE_COUNT = 200;

const usedComentIds = [];
const usedPictureIds = [];

const generateUser = () => ({
    id: (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(1, 6),
    name: (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomArrayElement)(_const_js__WEBPACK_IMPORTED_MODULE_0__.USER_NAMES),
    avatar: `./avatars/${(0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(1, 6)}.svg`
});

const generateComment = (maxPictureId) => {
    let comentId;
    do {
        comentId = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(1, maxPictureId * MAX_COMMENT_COUNT);
    } while (usedComentIds.includes(comentId));
    usedPictureIds.push(comentId);

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
    for (let i = 0; i < (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, MAX_COMMENT_COUNT); i++) {
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
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data.js */ "./src/data.js");


const pictures = (0,_data_js__WEBPACK_IMPORTED_MODULE_0__.generatePictures)(25);
console.log(pictures);

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map