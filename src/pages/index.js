import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithFormSubmit from "../components/PopupWithFormSubmit.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import './index.css';

import {
  buttonPopupEdit,
  buttonPopupAdd,
  formEditInput,
  nameInput,
  jobInput,
  formAddInput,
  config,
  profileAvatarPhoto,
  formEditAvatarInput,
  buttonSave,
  buttonDelete
} from '../utils/constants.js';

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-49', 'e6d7cecd-3ca4-4cc6-be79-debc6308da26');
const cardInfoSubmit = new PopupWithFormSubmit(".popup_delete")

//создание карточек
function createCard(data) {
  const card = new Card(data, myId, '.element-template_type_default', handleCardClick,
  {handleDeleteIconClick: () => {
    cardInfoSubmit.open();
    buttonDelete.addEventListener('click', () => { 
    cardInfoSubmit.setSubmitAction(() => {
      api.removeCard(data._id)
        .then(() => {
          card.deleteCard();
          cardInfoSubmit.close();
        })
        .catch((err) => {
          console.log(err)
        })
      })
      cardInfoSubmit.handleSubmit()
    })
  },
    handleLikeIconClick: (card) => {
      if(!card.isLiked()) {
        api.addLike(data._id)
          .then(() => {
            card.likeCard()
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        api.removeLike(data._id)
          .then(() => {
            card.dislikeCard()
          })
          .catch((err) => {
            console.log(err)
          })
      }
   }
  });
    const cardElement = card.generateCard();
    card.showDeleteButton()
    card.wasLiked()
    return cardElement;
}

//получение информации о пользователе с сервера
const userInfomation = api.getUserInfo()
.then((result) => {
  return result
})

//получение информации об изначальных карточках с сервера
const initialCards = api.getInitialCards()
.then((result) => {
  return result
})

const cardList = new Section({},".elements")
let myId

//прогрузка изначальных карточек и информации пользователя на страницу
Promise.all([userInfomation, initialCards])
.then(([user, cards]) => {
  myId = user._id;
  userInfo.setUserInfo(user.name, user.about);
  userInfo.setUserrAvatar(user.avatar);
  cards.reverse();
  cards.forEach(card => {
      const cardElement = createCard(card);
      cardList.addItem(cardElement);
  })
})
.catch((err) => {
  console.log(err);
})

//вставка текущих значений в инпуты редактирования
function pasteEditProfile ({ name, description }) {
  nameInput.value = name;
  jobInput.value = description;
};

//уведомление пользователя о процессе загрузки
function renderLoading(isLoading) {
  if(isLoading) {
    buttonSave.textContent = "Сохранение..."
  } else {
    buttonSave.textContent = "Сохранить"
  }
}

//открытие попапа карточки
function handleCardClick (image, title) {
  popupWithImage.open(image, title);
};

//попап добавления карточки
const popupAddNew = new PopupWithForm({
  popupSelector: ".popup_add",
  submitHandler: (data) => {
    renderLoading(true);
    api.addNewCard(data.title, data.url)
      .then((result) => {
        cardList.addItem(createCard(result));
        popupAddNew.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false);
      })
  }
});

//попап редактирования профиля
const popupEditNew = new PopupWithForm ({
  popupSelector: ".popup_edit", 
  submitHandler: (data) => {
    renderLoading(true);
    api.editUserInfo(data.name, data.description)
      .then((result) => {
        userInfo.setUserInfo(result.name, result.about);
        popupEditNew.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false);
      })
    }
  });

//открытие попапа редактирования профиля
buttonPopupEdit.addEventListener('click', () => { 
  const data = userInfo.getUserInfo();
  pasteEditProfile ({
    name: data.name,
    description: data.description
  });
  popupEditNew.open()
});

//попап редактирования аватара
const popupEditAvatarNew = new PopupWithForm ({
  popupSelector: ".popup_avatar",
  submitHandler: (data) => {
    renderLoading(true);
    api.editAvatar(data.avatar)
      .then((result) => {
        userInfo.setUserrAvatar(result.avatar);
        popupEditAvatarNew.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false);
      })
    }
  });

profileAvatarPhoto.addEventListener('click', () => { 
  popupEditAvatarNew.open()
});
popupEditAvatarNew.setEventListeners();

const popupWithImage = new PopupWithImage(".popup_show");
popupWithImage.setEventListeners();

const userInfo = new UserInfo ({
  userNameSelector: '.profile__name', 
  userDescriptionSelector: '.profile__description', 
  userAvatarSelector: '.profile__avatar'});

const formValidator = new FormValidator(config, formEditInput);
formValidator.enableValidation();

const formValidatorAdd = new FormValidator(config, formAddInput);
formValidatorAdd.enableValidation();

const formValidatorAvatar = new FormValidator(config, formEditAvatarInput);
formValidatorAvatar.enableValidation();

popupEditNew.setEventListeners();

buttonPopupAdd.addEventListener('click', () => { popupAddNew.open(); formValidatorAdd.resetValidation(); });
popupAddNew.setEventListeners();

cardInfoSubmit.setEventListeners();