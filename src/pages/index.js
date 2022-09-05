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
  profileName,
  profileDescription,
  profileAvatar,
  buttonSave,
  buttonDelete
} from '../utils/constants.js';

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-49');
const cardInfoSubmit = new PopupWithFormSubmit(".popup_delete")

//создание карточек
function createCard(data) {
  const card = new Card(data, '6c4ce037d701a0494d4d9124', '.element-template_type_default', handleCardClick,
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
      cardInfoSubmit.setEventListeners();
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
            card.likeCard()
          })
          .catch((err) => {
            console.log(err)
          })
      }
   }
  });
    const cardElement = card.generateCard();
    card.showDeleteButton()
    return cardElement;
}

//прогрузка изначальных карточек
const cardList = new Section({
  renderer: api.getInitialCards()
  .then((result) => {
    return result.forEach((item) => {
      const cardElement = createCard(item)
      cardList.addItem(cardElement)
      const numberOfLikes = document.querySelector('.element__number-of-likes');
      numberOfLikes.textContent = item.likes.length
    })
  })
      .catch((err) => {
        console.log(err);
      }),
    }, 
      ".elements"
    )

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
    buttonSave.textContent = "Создать"
  }
}

//загрузка информации о пользователе с сервера
function fillProfile (name, description, avatar) {
  profileName.textContent = name;
  profileDescription.textContent = description;
  profileAvatar.src = avatar;
  profileAvatar.alt = name;
}

api.getUserInfo()
.then((result) => {
  fillProfile (result.name, result.about, result.avatar)
})
.catch((err) => {
  console.log(err);
});

//вставка текущих значений в инпут смены аватара
function changeAvatar (url) {
  document.querySelector('.profile__avatar').src = url;
  document.querySelector('.profile__avatar').alt = url;
};

//открытие попапа карточки
function handleCardClick (image, title) {
  popupWithImage.open(image, title);
};

const popupAddNew = new PopupWithForm({
  popupSelector: ".popup_add",
  submitHandler: async (data) => {
    renderLoading(true);
    const cardElement = await api.addNewCard(data.title, data.url);
    cardList.addItem(createCard(cardElement));
  }
});

buttonPopupAdd.addEventListener('click', () => { popupAddNew.open(); formValidatorAdd.resetValidation(); });
popupAddNew.setEventListeners();

const popupEditNew = new PopupWithForm ({
  popupSelector: ".popup_edit", 
  submitHandler: (data) => {
    renderLoading(true);
    api.editUserInfo(data.name, data.description)
      .then((result) => {
        userInfo.setUserInfo(result.name, result.about)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false);
      })
    }
  });

buttonPopupEdit.addEventListener('click', () => { 
  const data = userInfo.getUserInfo();
  pasteEditProfile ({
    name: data.name,
    description: data.description
  });
  popupEditNew.open()
});

popupEditNew.setEventListeners();

const popupEditAvatarNew = new PopupWithForm ({
  popupSelector: ".popup_avatar",
  submitHandler: (data) => {
    renderLoading(true);
    api.editAvatar(data.avatar)
      .then((result) => {
        changeAvatar (result.avatar)
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

const userInfo = new UserInfo ({userNameSelector: '.profile__name', userDescriptionSelector: '.profile__description'});

const formValidator = new FormValidator(config, formEditInput);
formValidator.enableValidation();

const formValidatorAdd = new FormValidator(config, formAddInput);
formValidatorAdd.enableValidation();

const formValidatorAvatar = new FormValidator(config, formEditAvatarInput);
formValidatorAvatar.enableValidation();
