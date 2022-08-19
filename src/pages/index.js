import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import './index.css';

import {
  buttonPopupEdit,
  buttonPopupAdd,
  formEditInput,
  nameInput,
  jobInput,
  formAddInput,
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

//вставка текущий значений в инпуты редактирования
function pasteEditProfile ({ name, description }) {
  nameInput.value = name;
  jobInput.value = description;
}

//открытие попапа карточки
function handleCardClick (image, title) {
  popupWithImage.open(image, title);
};

const popupAddNew = new PopupWithForm ({popupSelector: ".popup_add", submitHandler: (data) => { ;
const cardElement = createCard({link: data, name: data});
cardList.addItem(cardElement);
}});

buttonPopupAdd.addEventListener('click', () => { popupAddNew.open(); formValidatorAdd.resetValidation(); });
popupAddNew.setEventListeners();

const popupEditNew = new PopupWithForm ({popupSelector: ".popup_edit", submitHandler: (data) => {userInfo.setUserInfo(data)}});
buttonPopupEdit.addEventListener('click', () => { 
  const data = userInfo.getUserInfo();
  pasteEditProfile ({
    name: data.name,
    description: data.description
  });
  popupEditNew.open()
});
popupEditNew.setEventListeners();

const popupWithImage = new PopupWithImage(".popup_show");
popupWithImage.setEventListeners();

const userInfo = new UserInfo ({userNameSelector: '.profile__name', userDescriptionSelector: '.profile__description'});

const formValidator = new FormValidator(config, formEditInput);
formValidator.enableValidation();

const formValidatorAdd = new FormValidator(config, formAddInput);
formValidatorAdd.enableValidation();