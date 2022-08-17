import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import './index.css';

import {
  elements,
  buttonPopupEdit,
  buttonPopupAdd,
  formEditInput,
  nameInput,
  jobInput,
  inputEditList,
  formAddInput,
  nameAddInput,
  imageAddInput,
  config,
  initialCards
} from '../utils/constants.js';

function createCard(item) {
  const card = new Card(item, '.element-template_type_default', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}
//создание и прогрузка изначальных шести карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item)
    cardList.addItem(cardElement)
  }
}, ".elements");

cardList.renderItems()

//добавление карточек
function handleAddProfileSubmit(event) {
  event.preventDefault();
  const cardElement = createCard({link: imageAddInput.value, name: nameAddInput.value})
  elements.prepend(cardElement);
};

//редактирование имени и описания профиля
function handleEditProfileSubmit() {
  userInfo.setUserInfo();
};

//открытие попапа карточки
function handleCardClick (image, title) {
  const popupWithImage = new PopupWithImage(".popup_show");
  popupWithImage.open(image, title);
};

const popupAddNew = new PopupWithForm (".popup_add", handleAddProfileSubmit);
buttonPopupAdd.addEventListener('click', () => popupAddNew.open())
popupAddNew.setEventListeners();

const popupEditNew = new PopupWithForm (".popup_edit", handleEditProfileSubmit);
buttonPopupEdit.addEventListener('click', () => popupEditNew.open());
popupEditNew.setEventListeners();

const popupWithImage = new PopupWithImage(".popup_show");
popupWithImage.setEventListeners();

const userInfo = new UserInfo ({userName: '.profile__name', userDescription: '.profile__description'});
buttonPopupEdit.addEventListener('click', () => userInfo.setUserInfo());

const formValidator = new FormValidator(config, formEditInput);
formValidator.enableValidation();

const formValidatorAdd = new FormValidator(config, formAddInput);
formValidatorAdd.enableValidation();