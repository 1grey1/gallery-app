import {renderValidationErrors} from './validation.js';
import {setSignupFormSubmit} from './signup-form.js';
import {setLoginFormSubmit} from './login-form.js';
import {closeSignupModal} from './signup-modal.js';
import {updatePageHeader} from './page-header.js';
import {closeLoginModal} from './login-modal.js';
import {setLogoutBtnClick} from './logout.js';
import {AppStorage} from '../const.js';
import {start} from '../start.js';

setLoginFormSubmit(
    (token) => {
        closeLoginModal();
        localStorage.setItem(AppStorage.ACCESS_TOKEN, JSON.stringify(token));
        updatePageHeader();
        start();
    },
    renderValidationErrors
);
    
setSignupFormSubmit(
    () => {
        closeSignupModal();
        start();
    },
    renderValidationErrors
);

setLogoutBtnClick(() => {
    localStorage.removeItem(AppStorage.ACCESS_TOKEN);
    updatePageHeader();
});
