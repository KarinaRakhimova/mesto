export class FormValidator {
  constructor(config, formElement) {
    this._form = formElement;
    this._input = config.inputSelector;
    this._inputList = [...this._form.querySelectorAll(this._input)]
    this._submitButton = formElement.querySelector(config.submitButtonSelector);
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inactiveButtonClass = config.inactiveButtonClass;
  }

  _showError(input) {
    input.classList.add(this._inputErrorClass);
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = input.validationMessage;
  }

  hideError(input) {
    input.classList.remove(this._inputErrorClass);
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _isValid(input) {
    if (!input.validity.valid) {
      this._showError(input)
    }
    else {
      this.hideError(input)
    }
  }

  _checkInputValidity(inputList) {
      return inputList.every((inputElement) => {
        return (inputElement.validity.valid);
      })
    };

  _disableButton(button) {
    button.setAttribute('disabled', 'disabled');
    button.classList.add(this._inactiveButtonClass);
  }

  _enableButton(button) {
    button.removeAttribute('disabled');
    button.classList.remove(this._inactiveButtonClass);
  }

  toggleButtonState() {
    if (!this._checkInputValidity(this._inputList)) {
      this._disableButton(this._submitButton);
    }
    else {
      this._enableButton(this._submitButton);
    }
  }

  _setInputListeners() {
      this.toggleButtonState(this._inputList, this._submitButton);
      this._inputList.forEach((input) => {
        input.addEventListener('input', () => {
          this._isValid(input);
          this.toggleButtonState(this._inputList, this._submitButton);
        })
      })
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => evt.preventDefault());
      this._setInputListeners();
    }
  }

