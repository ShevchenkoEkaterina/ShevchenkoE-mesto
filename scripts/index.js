const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_edit');
const popup = document.querySelector('.popup');
const popupClose = popup.querySelector('.popup__close');
const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_add');
const showPopup = document.querySelector('.popup_show');
const addPopupClose = document.querySelector('.popup__add-close');
const showPopupClose = document.querySelector('.popup__show-close');
const elementsList = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content;

  initialCards.forEach(function renderElements(element) {
    const card = elementTemplate.cloneNode(true);
    card.querySelector('.element__image').src = element.link;
    card.querySelector('.element__description').textContent = element.name;
    elementsList.append(card)
  });

function openAddPopup () {
  addPopup.classList.add('popup_opened');
};

function openEditPopup () {
  popupEdit.classList.add('popup_opened');
};

function closePopup (event) {
    event.preventDefault();
    popupEdit.classList.remove('popup_opened');
    addPopup.classList.remove('popup_opened');
    showPopup.classList.remove('popup_opened');
};

editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);
popupClose.addEventListener('click', closePopup);
addPopupClose.addEventListener('click', closePopup);

const formElement = document.querySelector('.input_edit');
const nameInput = document.querySelector('.input__text_name_edit');
const jobInput = document.querySelector('.input__text_description_edit');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

nameInput.value = profileName.textContent;
jobInput.value = profileDescription.textContent;

function formSubmitHandler (event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
};

formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', closePopup);

const formAddElement = document.querySelector('.input_add');

const popupImage = document.querySelector('.popup__image');
const titleImage = document.querySelector('.popup__show-title');
const elementImage = document.querySelectorAll('.element__image');
  
function openShowPopup (event) {
  showPopup.classList.add('popup_opened');
  popupImage.src = event.target.src;
  titleImage.textContent = document.querySelector('.element__description').textContent;
};

elementImage.forEach(function (button) {
  button.addEventListener('click', openShowPopup);
});

function addCard (imageValue, nameValue) {
  const elementTemplate = document.querySelector('.element-template').content;
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = imageValue;
  cardElement.querySelector('.element__description').textContent = nameValue;
  elementsList.prepend(cardElement);

  const elementImage = cardElement.querySelector('.element__image');
  elementImage.addEventListener('click', function (evt) {
    showPopup.classList.add('popup_opened');
    popupImage.src = evt.target.src;
    titleImage.textContent = evt.target.querySelector('.element__description').textContent;
});

  const likeButton = cardElement.querySelector('.element__like');
  likeButton.addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__like_active');
  });

  const deleteButton = cardElement.querySelector('.element__delete');
  deleteButton.addEventListener('click', function () {
  const listItem = deleteButton.closest('.element');
  listItem.remove();
  });
};

function addSubmitHandler (event) {
  event.preventDefault();
  const name = document.querySelector('.input__text_name_add');
  const image = document.querySelector('.input__text_description_add');
  addCard(image.value, name.value);
  image.value ="";
  name.value ="";
};

formAddElement.addEventListener('submit', addSubmitHandler)
formAddElement.addEventListener('submit', closePopup);
showPopupClose.addEventListener('click', closePopup);

function likeButtonWork (evt) {
    evt.target.classList.toggle('element__like_active');
  };

const likeButton = document.querySelectorAll('.element__like');
likeButton.forEach(function (button) {
  button.addEventListener('click', likeButtonWork);
});

const deleteButton = document.querySelector('.element__delete');
function DeleteButtonWork () {
  const listItem = deleteButton.closest('.element');
  listItem.remove();
};

deleteButton.addEventListener('click', DeleteButtonWork);
