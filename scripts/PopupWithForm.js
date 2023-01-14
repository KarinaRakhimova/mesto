import Popup from './Popup.js';
export default class PopupWithForm extends Popup {

  static selectors = {
    popupInputSelector: '.popup__input',
    popupFormSelector: '.popup__form',
  }

  constructor(popupSelector, submitFn) {
    super(popupSelector, submitFn);
    this._submitFn = submitFn;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(PopupWithForm.selectors.popupInputSelector);
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector(PopupWithForm.selectors.popupFormSelector).addEventListener('submit', evt => {
    evt.preventDefault();
    this._submitFn(this._getInputValues());
    this.closePopup();
   })
  }

  closePopup() {
    super.closePopup();
    this._popup.querySelector(PopupWithForm.selectors.popupFormSelector).reset();
  }
}
