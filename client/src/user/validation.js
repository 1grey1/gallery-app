const clearValidationErrors = () => {

};

const renderValidationErrors = (errors, fields, formElement) => {
    clearValidationErrors();

    for (const error of errors) {
        if (fields.includes(error.field)) {
            const inputElement = formElement.querySelector(`[name=${error.field}]`);
            inputElement.classList.add('is-invalid');
            inputElement.nextElementSibling.textContent = error.message;
        }
    }
};

export {renderValidationErrors};
