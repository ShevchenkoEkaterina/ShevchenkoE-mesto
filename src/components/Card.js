class Card {
  constructor(data, myId, cardSelector, handleCardClick, {handleDeleteIconClick, handleLikeIconClick}) {
    this._cardSelector = cardSelector;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._myId = myId;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeIconClick = handleLikeIconClick;
  }
    
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._link;
    this._element.querySelector('.element__description').textContent = this._name;

    return this._element;
  }

  isLiked() {
      return (this._likes.some(item => item._id === this._myId));
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.element__like');
    this._cardImage = this._element.querySelector('.element__image');
    this._deleteButton = this._element.querySelector('.element__delete');
    this._likeButton.addEventListener('click', () => {
      this._handleLikeIconClick(this);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteIconClick(this)
    });
  }

  likeCard() {
    this._likeButton.classList.toggle('element__like_active');
  }

  deleteCard() {
    this._element.remove();
  }

  showDeleteButton() {
    if(this._ownerId === this._myId) {
      this._deleteButton.classList.add('element__delete_active');
    } else {
      this._deleteButton.classList.remove('element__delete_active');
    }
  }

}

export default Card;
