const config = {
  formSelector: '.input',
  inputSelector: '.input__text',
  submitButtonSelector: '.input__save-button',
  inactiveButtonClass: 'input__save-button_disabled',
  inputErrorClass: 'input__text_type_error',
  errorClassActive: 'input__text-error_active'
}

function showInputError(formElement, inputElement, errorMessage, { inputErrorClass, errorClassActive }) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClassActive);
};

function hideInputError(formElement, inputElement, { inputErrorClass, errorClassActive }) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClassActive);
  errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement, other) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, other);
  } else {
    hideInputError(formElement, inputElement, other);
  }
};

function disableButton(buttonElement) {
    buttonElement.classList.add('input__save-button_disabled');
    buttonElement.setAttribute('disabled', true);
};

function toggleButtonState(inputList, buttonElement, { inactiveButtonClass }) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function setEventListeners(formElement, { inputSelector, submitButtonSelector, ...rest }) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  // toggleButtonState(inputList, buttonElement, rest);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, rest);
    });
  });
};

function enableValidation(config) {
  const { formSelector, ...rest } = config;

  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, rest);
  });

}

enableValidation(config);