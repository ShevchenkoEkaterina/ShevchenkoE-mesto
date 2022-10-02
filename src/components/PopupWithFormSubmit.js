import Popup from "../components/Popup.js";

export default class PopupWithFormSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }

  handleSubmit() {
    this._handleSubmitCallback();
  }
};