import {setSignupFormSubmit} from './signup-form.js';
import {closeSignupModal} from './signup-modal.js';
import {renderValidationErrors} from './validation.js';
import './login-modal.js';

setSignupFormSubmit(
    closeSignupModal,
    renderValidationErrors
);
