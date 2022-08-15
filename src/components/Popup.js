export default class Popup {
    constructor(popupSelector) {
      this._popup = popupSelector;
    }

    open() {
      this._popup.classList.add('popup_opened');
      this._handleEscClose();
      this.setEventListeners()
    };

    close() {
      this._popup.classList.remove('popup_opened');
    };

    _handleEscClose() {
      document.addEventListener('keydown', (evt) => {
          if(evt.key === 'Escape') {
            this.close()
          };
        });
    };

    setEventListeners() {
      this._popup.addEventListener('click', (evt) => {
        if(evt.target === evt.currentTarget) {
          this.close()
        };
      });
      const closeButtons = document.querySelectorAll('.popup__close')
      closeButtons.forEach((closeButton) => {
        closeButton.addEventListener('click', () => {
          this.close()
        });
      });
    };
};