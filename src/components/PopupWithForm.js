import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, submitHandler}) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._inputList = this._popup.querySelectorAll('.input__text')
  }

  close() {
    super.close();
    this._inputList.forEach((inputValue) => {
      inputValue.value ="";
    }); 
  };

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }; 

  setEventListeners() {
    super.setEventListeners();
    const formElement = this._popup.querySelector('.input');
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
      this.close();
    });
    };
};