import {renderValidationErrors} from './validation.js';
import {setSignupFormSubmit} from './signup-form.js';
import {setLoginFormSubmit} from './login-form.js';
import {updatePageHeader} from './page-header.js';
import {closeModal} from "./modal";
import {setLogoutBtnClick} from './logout.js';
import {AppStorage} from '../const.js';
import {start} from '../start.js';

setLoginFormSubmit(
    (token) => {
        closeModal();
        localStorage.setItem(AppStorage.ACCESS_TOKEN, JSON.stringify(token));
        updatePageHeader();
        start();
    },
    renderValidationErrors
);
    
setSignupFormSubmit(
    () => {
        closeModal();
        start();
    },
    renderValidationErrors
);

setLogoutBtnClick(() => {
    localStorage.removeItem(AppStorage.ACCESS_TOKEN);
    updatePageHeader();
});
