import {setSignupFormSubmit} from './signup-form.js';
import {setLoginFormSubmit} from './login-form.js';
import {closeSignupModal} from './signup-modal.js';
import {closeLoginModal} from './login-modal.js';
import {renderValidationErrors} from './validation.js';
import {updatePageHeader} from './page_header.js';
import {Storage} from '../const.js';

setLoginFormSubmit(
    (token) => {
        closeLoginModal();
        localStorage.setItem(Storage.ACCESS_TOKEN, JSON.stringify(token));
        updatePageHeader();
    }, 
    renderValidationErrors
);

setSignupFormSubmit(
    closeSignupModal,
    renderValidationErrors
);
