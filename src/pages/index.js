import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import './index.css';

import {
  popupEdit,
  elements,
  popupAdd,
  popupShow,
  buttonPopupEdit,
  buttonPopupAdd,
  formEditInput,
  nameInput,
  jobInput,
  profileName,
  profileDescription,
  formAddInput,
  nameAddInput,
  imageAddInput,
  config,
  initialCards
} from '../utils/constants.js';

//создание и прогрузка изначальных шести карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.element-template_type_default', handleCardClick);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement)
  }
}, elements);

cardList.renderItems()

//добавление карточек
function handleAddProfileSubmit(event) {
  event.preventDefault();
  const card = new Card({link: imageAddInput.value, name: nameAddInput.value}, '.element-template_type_default', handleCardClick);
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
};

//редактирование имени и описания профиля
function handleEditProfileSubmit(event) {
  event.preventDefault();
  const userInfo = new UserInfo ({userName: profileName, userDescription: profileDescription});
  userInfo.getUserInfo();
};

//открытие попапа карточки
function handleCardClick (image, title) {
  const popupWithImage = new PopupWithImage(popupShow);
  popupWithImage.open(image, title);
};

const popupAddNew = new PopupWithForm (popupAdd, handleAddProfileSubmit);
buttonPopupAdd.addEventListener('click', () => popupAddNew.open())
popupAddNew.setEventListeners();

const popupEditNew = new PopupWithForm (popupEdit, handleEditProfileSubmit);
buttonPopupEdit.addEventListener('click', () => popupEditNew.open());
popupEditNew.setEventListeners();

const userInfo = new UserInfo ({userName: profileName, userDescription: profileDescription});
buttonPopupEdit.addEventListener('click', () => userInfo.setUserInfo());

const formValidator = new FormValidator(config, formEditInput);
formValidator.enableValidation();

const formValidatorAdd = new FormValidator(config, formAddInput);
formValidatorAdd.enableValidation();