export default class Popup {

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close');
    this._handleCloseByEsc = this._handleCloseByEsc.bind(this);
    //возможно слушатели сразу устанавливать при создании экземпляра класса?
    //this._listeners = this.setEventListeners();
  }

  open() {
    document.addEventListener('keydown', this._handleCloseByEsc);
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleCloseByEsc);
  }

  _handleCloseByOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      this.close()
    }
  }

  _handleCloseByEsc(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => this.close());
    this._popup.addEventListener('mousedown', (evt) => this._handleCloseByOverlayClick(evt));
  }
}
