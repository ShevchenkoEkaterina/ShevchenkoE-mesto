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
const nameInput = document.querySelector('.input__text_name_edit');
const jobInput = document.querySelector('.input__text_description_edit');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formAddInput = document.querySelector('.input_add');
const popupImage = document.querySelector('.popup__image');
const titleImage = document.querySelector('.popup__show-title');
const nameAddInput = document.querySelector('.input__text_name_add');
const imageAddInput = document.querySelector('.input__text_description_add');
const inputSaveButtonAdd = document.querySelector('.input__save-button_add');
const inputSaveButtonEdit = document.querySelector('.input__edit-save-button');

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

//открытие попапа редактирования профиля
function openEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  disableButton(inputSaveButtonEdit);

  openPopup(popupEdit);
};

//открытие попапа добавления картинки
function openAddPopup() {
  disableButton(inputSaveButtonAdd);

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

//создание/удаление/лайк карточки
function createCard(cardData) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.link;
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
  addCard({link: imageAddInput.value, name: nameAddInput.value});
  imageAddInput.value ="";
  nameAddInput.value ="";

  closePopup(popupAdd);
};

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
formAddInput.addEventListener('submit', handleAddCardSubmit)
buttonPopupShowClose.addEventListener('click', function () {
  closePopup(popupShow);
});
buttonPopupEditClose.addEventListener('click', function () {
  closePopup(popupEdit);
});
