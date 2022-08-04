class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClassActive = config.errorClassActive;
    this._formElement = formElement;
  }

  _showInputError() {
    const errorElement = document.querySelector('.input').querySelector(`#${document.querySelector('.input__text').id}-error`);
    document.querySelector('.input__text').classList.add(this._inputErrorClass);
    errorElement.textContent = document.querySelector('.input__text').validationMessage;
    errorElement.classList.add(this._errorClassActive);
  };

  _hideInputError() {
    const errorElement = document.querySelector('.input').querySelector(`#${document.querySelector('.input__text').id}-error`);
    document.querySelector('.input__text').classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClassActive);
    errorElement.textContent = '';
  };
    
  _checkInputValidity() {
    if (!document.querySelector('.input__text').validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  };

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };
    
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
    
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll('.input__text'));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input',  () => {
        this._checkInputValidity();
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };
    
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
  };

};

export default FormValidator;