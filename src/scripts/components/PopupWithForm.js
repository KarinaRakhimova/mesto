import Popup from './Popup.js';
export default class PopupWithForm extends Popup {

  constructor(popupSelector, submitFn) {
    super(popupSelector, submitFn);
    this._submitFn = submitFn;
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  _submit = (evt) => {
    evt.preventDefault()
    this._submitFn(this._getInputValues())
    this.close()
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._submit)
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }
}
