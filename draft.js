const config = {
    formSelector: '.input',
    inputSelector: '.input__text',
    submitButtonSelector: '.input__save-button',
    inactiveButtonClass: 'input__save-button_disabled',
    inputErrorClass: 'input__text_type_error',
    errorClass: 'input__text_error_visible'
  }
  
  function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('input__text_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('input__text-error_active');
  };
  
  function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('input__text_type_error');
    errorElement.classList.remove('input__text-error_active');
    errorElement.textContent = '';
  };
  
  function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  
  function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('input__save-button_disabled');
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove('input__save-button_disabled');
      buttonElement.removeAttribute('disabled');
    }
  };
  
  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    }); 
  };
  
  function setEventListeners(formElement, config = {
    formSelector: '.input',
    inputSelector: '.input__text',
    submitButtonSelector: '.input__save-button',
    inactiveButtonClass: 'input__save-button_disabled',
    inputErrorClass: 'input__text_type_error',
    errorClass: 'input__text_error_visible'
  }) {
    const inputList = Array.from(formElement.querySelectorAll('.input'));
    const buttonElement = formElement.querySelector('.input__save-button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  function enableValidation() {
    const config = {
      formSelector: '.input',
      inputSelector: '.input__text',
      submitButtonSelector: '.input__save-button',
      inactiveButtonClass: 'input__save-button_disabled',
      inputErrorClass: 'input__text_type_error',
      errorClass: 'input__text_error_visible'
    }
    const { formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, errorClass } = config;
    console.log(formSelector)
    const formList = Array.from(document.querySelectorAll(".input__text"));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
        setEventListeners(formElement, config = {
          formSelector: '.input',
          inputSelector: '.input__text',
          submitButtonSelector: '.input__save-button',
          inactiveButtonClass: 'input__save-button_disabled',
          inputErrorClass: 'input__text_type_error',
          errorClass: 'input__text_error_visible'
        });
      });
    });
  }
  
  enableValidation(config);
  
  console.log(enableValidation(config))

