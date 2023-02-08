import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitFn) {
    super(popupSelector,submitFn);
    this._form = this._popup.querySelector('.popup__form')
    this._submitFn = submitFn;
  }

  _submit = (evt) => {
    evt.preventDefault();
    this._submitFn();
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._submit)
    super.setEventListeners();
  }
}
