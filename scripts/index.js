import Card from "./Card.js"
import FormValidator from "./FormValidator.js"

const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupShow = document.querySelector('.popup_show');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const buttonPopupEditClose = document.querySelector('.popup__edit-close');
const buttonPopupAddClose = document.querySelector('.popup__add-close');
const buttonPopupShowClose = document.querySelector('.popup__show-close');
const formEditInput = document.querySelector('.input_edit');
const nameInput = document.querySelector('.input__text_name_edit');
const jobInput = document.querySelector('.input__text_description_edit');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formAddInput = document.querySelector('.input_add');
const popupImage = document.querySelector('.popup__image');
const titleImage = document.querySelector('.popup__show-title');
const nameAddInput = document.querySelector('.input__text_name_add');
const imageAddInput = document.querySelector('.input__text_description_add');
const cardsList = document.querySelector('.elements');
const inputEditSaveButton = document.querySelector('.input__edit-save-button');
const inputAddSaveButton = document.querySelector('.input__save-button_add');
const config = {
  formSelector: '.input',
  inputSelector: '.input__text',
  submitButtonSelector: '.input__save-button',
  inactiveButtonClass: 'input__save-button_disabled',
  inputErrorClass: 'input__text_type_error',
  errorClassActive: 'input__text-error_active'
}
const initialCards = [
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

//закрытие попапа путем нажатия на кнопку
function handleEscKeyPress(evt) {
  if(evt.key === 'Escape' & popupEdit.classList.contains('popup_opened')) {
    closePopup(popupEdit)
  };
  if(evt.key === 'Escape' & popupAdd.classList.contains('popup_opened')) {
    closePopup(popupAdd)
  };
  if(evt.key === 'Escape' & popupShow.classList.contains('popup_opened')) {
    closePopup(popupShow)
  };
};

//открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', handleEscKeyPress);
};

function disableButton(buttonElement) {
  buttonElement.classList.add('input__save-button_disabled');
  buttonElement.setAttribute('disabled', true);
};

//открытие попапа редактирования профиля
function openEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  disableButton(inputEditSaveButton)
  openPopup(popupEdit);
};

//открытие попапа добавления картинки
function openAddPopup() {
  disableButton(inputAddSaveButton)
  openPopup(popupAdd);
};

//закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', handleEscKeyPress);
};

//изменение имени и описания профиля
function handleEditProfileSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupEdit);
};

//открытие попапа карточки
function handleCardClick (name, link) {
  popupImage.src = link;
  popupImage.alt = link;
  titleImage.textContent = name;
  
  openPopup(popupShow);
}

//прогрузка изначальных карточек
initialCards.forEach((item) => {
  const card = new Card(item, '.element-template_type_default', handleCardClick);
  const cardElement = card.generateCard();
  cardsList.prepend(cardElement);
});

//слушатели
popupEdit.addEventListener('click', function (evt) {
  if(evt.target === evt.currentTarget) {
    closePopup(popupEdit);
  }
});
popupAdd.addEventListener('click', function (evt) {
  if(evt.target === evt.currentTarget) {
    closePopup(popupAdd);
  }
});
popupShow.addEventListener('click', function (evt) {
  if(evt.target === evt.currentTarget) {
    closePopup(popupShow);
  }
});
addButton.addEventListener('click', openAddPopup);
editButton.addEventListener('click', openEditPopup);
buttonPopupAddClose.addEventListener('click', function () {
  closePopup(popupAdd);
});
formEditInput.addEventListener('submit', handleEditProfileSubmit);
buttonPopupShowClose.addEventListener('click', function () {
  closePopup(popupShow);
});
buttonPopupEditClose.addEventListener('click', function () {
  closePopup(popupEdit);
});
formAddInput.addEventListener('submit', function (event) {
  event.preventDefault();
  const card = new Card({link: imageAddInput.value, name: nameAddInput.value}, '.element-template_type_default', handleCardClick);
  const cardElement = card.generateCard();
  cardsList.prepend(cardElement);
  imageAddInput.value ="";
  nameAddInput.value ="";

  closePopup(popupAdd);
});


const formValidator = new FormValidator(config, formEditInput);
formValidator.enableValidation();

const formValidatorAdd = new FormValidator(config, formAddInput);
formValidatorAdd.enableValidation();