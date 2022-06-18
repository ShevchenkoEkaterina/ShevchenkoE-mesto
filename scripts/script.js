let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__close');

function openPopup (event) {
    event.preventDefault();
    popup.classList.add('popup_opened');
}

function closePopup (event) {
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);

let formElement = document.querySelector('.input');
let nameInput = document.querySelector('.input__text_name');
let jobInput = document.querySelector('.input__text_description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let inputSaveButton = document.querySelector('.input__save-button');

nameInput.value = profileName.textContent;
jobInput.value = profileDescription.textContent;

function formSubmitHandler (event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);
inputSaveButton.addEventListener('click', closePopup);