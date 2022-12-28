export class FormValidator {
  constructor(config, formElement) {
    this._form = formElement;
    this._input = config.inputSelector;
    this._button = config.submitButtonSelector;
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

  _hideError(input) {
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
      this._hideError(input)
    }
  }

  _checkInputValidity = (inputList) => {
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

  _toggleButtonState(inputs, button) {
    if (!this._checkInputValidity(inputs)) {
      this._disableButton(button);
    }
    else {
      this._enableButton(button);
    }
  }

  _setInputListeners() {
      const inputs = [...this._form.querySelectorAll(this._input)];
      const button = this._form.querySelector(this._button);
      this._toggleButtonState(inputs, button);
      inputs.forEach((input) => {
        input.addEventListener('input', () => {
          this._isValid(input);
          this._toggleButtonState(inputs, button);
        })
      })
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => evt.preventDefault());
      this._setInputListeners();
    }
  }

