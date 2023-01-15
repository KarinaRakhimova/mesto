import Popup from './Popup.js';
export default class PopupWithImage extends Popup {

  static selectors = {
    popupImageSelector: '.popup__image',
    popupCaptionSelector: '.popup__caption',
  }

  constructor(popupSelector, card) {
    super(popupSelector, card);
    this._name = card.name;
    this._link = card.link;
  }

  openPopup() {
    super.openPopup();
    this._popup.querySelector(PopupWithImage.selectors.popupImageSelector).src = this._link;
    this._popup.querySelector(PopupWithImage.selectors.popupCaptionSelector).textContent = this._name;
  }
}
