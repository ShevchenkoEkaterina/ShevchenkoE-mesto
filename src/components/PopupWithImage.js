import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = popupSelector;
  }

  open(image, title) {
    this._popup.querySelector('.popup__image').src = image;
    this._popup.querySelector('.popup__image').alt = image;
    this._popup.querySelector('.popup__show-title').textContent = title;
    super.open();
  };
}