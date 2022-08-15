import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._popup = popupSelector;
    this._submitForm = submitForm;
  }

  open() {
    super.open();
    const submitButtonList = document.querySelectorAll('.input__save-button');
    submitButtonList.forEach((submitButton) => {
      submitButton.classList.add('input__save-button_disabled');
    });
    submitButtonList.forEach((submitButton) => {
      submitButton.setAttribute('disabled', true);
     });
    };

  close() {
    super.close();
    const inputListValue = this._popup.querySelectorAll('.input__text');
    inputListValue.forEach((inputValue) => {
        inputValue.value ="";
      });
    };

  _getInputValues() {
    const _inputListValue = this._popup.querySelectorAll('.input__text');
    this._formValues = {};
    _inputListValue.forEach(input => this._formValues[input.name] = input.value);
  };

  setEventListeners() {
    super.setEventListeners();
    const input = this._popup.querySelector('.input');
    input.addEventListener('submit', this._submitForm);
    input.addEventListener('submit', () => this.close());
    };
};