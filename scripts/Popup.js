export default class Popup {

  static selectors = {
    closeButtonSelector: '.popup__close',
    openedPopupClass: 'popup_opened',
  }
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(Popup.selectors.closeButtonSelector)
  }

  openPopup() {
    this._popup.classList.add(Popup.selectors.openedPopupClass);
    this.setEventListeners();
  }

  closePopup() {
    this._popup.classList.remove(Popup.selectors.openedPopupClass);
    document.removeEventListener('keydown', (evt) => this._handleCloseByEsc(evt));
  }

  _handleCloseByOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      this.closePopup()
    }
  }
  _handleCloseByEsc(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => this.closePopup());
    this._popup.addEventListener('mousedown', (evt) => this._handleCloseByOverlayClick(evt));
    document.addEventListener('keydown', (evt) => this._handleCloseByEsc(evt));
  }
}
