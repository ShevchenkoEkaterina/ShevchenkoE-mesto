const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupShow = document.querySelector('.popup_show');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const buttonPopupEditClose = document.querySelector('.popup__edit-close');
const buttonPopupAddClose = document.querySelector('.popup__add-close');
const buttonPopupShowClose = document.querySelector('.popup__show-close');
const cardsList = document.querySelector('.elements');
const cardTemplate = document.querySelector('.element-template').content.querySelector('.element');
const formEditInput = document.querySelector('.input_edit');
const inputSaveButton = document.querySelector('.input__save-button');
const nameInput = document.querySelector('.input__text_name_edit');
const jobInput = document.querySelector('.input__text_description_edit');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formAddInput = document.querySelector('.input_add');
const popupImage = document.querySelector('.popup__image');
const titleImage = document.querySelector('.popup__show-title');
const nameAddInput = document.querySelector('.input__text_name_add');
const imageAddInput = document.querySelector('.input__text_description_add');
const config = {
  formSelector: '.input',
  inputSelector: '.input__text',
  submitButtonSelector: '.input__save-button',
  inactiveButtonClass: 'input__save-button_disabled',
  inputErrorClass: 'input__text_type_error',
  errorClass: 'input__text_error_visible'
};

const { formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, errorClass } = config;

//открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

//открытие попапа редактирования профиля
function openEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(popupEdit);
};

//закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

//изменение имени и описания профиля
function handleEditProfileSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupEdit);
};

//создание/удаление/лайк карточки
function createCard(cardData) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  
  cardImage.src = cardData.link;
  card.querySelector('.element__description').textContent = cardData.name;

  cardImage.addEventListener('click', function () {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.link;
    titleImage.textContent = cardData.name;

    openPopup(popupShow);
  });

  const likeButton = card.querySelector('.element__like');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('element__like_active');
  });

  const deleteButton = card.querySelector('.element__delete');
  deleteButton.addEventListener('click', function () {
    card.remove();
  });

  popupShow.addEventListener('click', function (evt) {
    if(evt.target === evt.currentTarget) {
      closePopup(popupShow);
    }
  })

  return card;
};

//добавление карточек
function addCard(cardData) {
  cardsList.prepend(createCard(cardData));
};

//прогрузка начальных карточек
initialCards.forEach(function (cardData) {
  addCard(cardData);
});

//добавление новых карточек
function handleAddCardSubmit(event) {
  event.preventDefault();
  addCard(imageAddInput.value, nameAddInput.value);
  imageAddInput.value ="";
  nameAddInput.value ="";

  closePopup(popupAdd);
};

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
    buttonElement.removeattribute('disabled', true);
  }
};
  
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
};
  
function setEventListeners(formElement, { formSelector, inputSelector, submitButtonSelector, ...rest } ) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, rest);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
  
function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.input'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      setEventListeners(formElement);
    });
  });
};
  
enableValidation(config);

//слушатели
popupEdit.addEventListener('keydown', function (evt) {
  if(evt.key === 'Escape') {
    closePopup(popupEdit);
  }
});
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
addButton.addEventListener('click', function () {
  openPopup(popupAdd);
});
editButton.addEventListener('click', openEditPopup);
buttonPopupAddClose.addEventListener('click', function () {
  closePopup(popupAdd);
});
formEditInput.addEventListener('submit', handleEditProfileSubmit);
formAddInput.addEventListener('submit', handleAddCardSubmit)
buttonPopupShowClose.addEventListener('click', function () {
  closePopup(popupShow);
});
buttonPopupEditClose.addEventListener('click', function () {
  closePopup(popupEdit);
});
