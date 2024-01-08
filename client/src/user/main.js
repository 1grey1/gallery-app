import {renderValidationErrors} from './validation.js';
import {setSignupFormSubmit} from './signup-form.js';
import {setLoginFormSubmit} from './login-form.js';
import {closeSignupModal} from './signup-modal.js';
import {updatePageHeader} from './page-header.js';
import {closeLoginModal} from './login-modal.js';
import {setLogoutBtnClick} from './logout.js';
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

setLogoutBtnClick(() => {
    localStorage.removeItem(Storage.ACCESS_TOKEN);
    updatePageHeader();
});
