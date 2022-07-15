const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupShow = document.querySelector('.popup_show');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const buttonPopupEditClose = document.querySelector('.popup__edit-close');
const buttonPopupAddClose = document.querySelector('.popup__add-close');
const buttonPopupShowClose = document.querySelector('.popup__show-close');
const cardsList = document.querySelector('.elements');
const card = document.querySelector('.element');
const cardTemplate = document.querySelector('.element-template').content.querySelector('.element');
const formEditInput = document.querySelector('.input_edit');
const nameInput = document.querySelector('.input__text_name_edit');
const jobInput = document.querySelector('.input__text_description_edit');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formAddInput = document.querySelector('.input_add');
const popupImage = document.querySelector('.popup__image');
const titleImage = document.querySelector('.popup__show-title');
const imageList = document.querySelectorAll('.element__image');
const nameAddInput = document.querySelector('.input__text_name_add');
const imageAddInput = document.querySelector('.input__text_description_add');

//открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

//открытие попапа редактирования профиля
function openEditPopup() {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
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

  formEditInput.addEventListener('submit', closePopup(popupEdit));
};

//создание/удаление/лайк карточки
function createCard(cardData) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  
  cardImage.src = cardData.link;
  card.querySelector('.element__description').textContent = cardData.name;

  cardImage.addEventListener('click', function () {
    openPopup(popupShow);
    popupImage.src = cardData.link;
    popupImage.alt = cardData.link;
    titleImage.textContent = cardData.name;
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
function handleAddProfileSubmit(event) {
  event.preventDefault();
  addCard(imageAddInput.value, nameAddInput.value);
  imageAddInput.value ="";
  nameAddInput.value ="";

  formAddInput.addEventListener('submit', closePopup(popupAdd));
};

//слушатели
addButton.addEventListener('click', function openAddPopup() {
  openPopup(popupAdd);
});
editButton.addEventListener('click', openEditPopup);
buttonPopupAddClose.addEventListener('click', function openAddPopup() {
  closePopup(popupAdd);
});
formEditInput.addEventListener('submit', handleEditProfileSubmit);
formAddInput.addEventListener('submit', handleAddProfileSubmit)
buttonPopupShowClose.addEventListener('click', function openAddPopup() {
  closePopup(popupShow);
});
buttonPopupEditClose.addEventListener('click', function openAddPopup() {
  closePopup(popupEdit);
});
