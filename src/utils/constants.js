export const elements = document.querySelector('.elements');
export const buttonPopupEdit = document.querySelector('.profile__edit-button');
export const buttonPopupAdd = document.querySelector('.profile__add-button');
export const formEditInput = document.querySelector('.input_edit');
export const nameInput = document.querySelector('.input__text_name_edit');
export const jobInput = document.querySelector('.input__text_description_edit');
export const inputEditList = document.querySelector('.input__text');
export const formAddInput = document.querySelector('.input_add');
export const nameAddInput = document.querySelector('.input__text_name_add');
export const imageAddInput = document.querySelector('.input__text_description_add');
export const config = {
  formSelector: '.input',
  inputSelector: '.input__text',
  submitButtonSelector: '.input__save-button',
  inactiveButtonClass: 'input__save-button_disabled',
  inputErrorClass: 'input__text_type_error',
  errorClassActive: 'input__text-error_active'
}
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];