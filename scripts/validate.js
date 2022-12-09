//валидация форм
const validationObjects = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
  }

  const showError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(validationObjects.errorClass);
    inputElement.classList.add(validationObjects.inputErrorClass);
    errorElement.textContent = errorMessage;
  }

  const hideError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(validationObjects.errorClass);
    inputElement.classList.remove(validationObjects.inputErrorClass);
    errorElement.textContent = "";
  }

  const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showError(formElement, inputElement, inputElement.validationMessage);
    }
    else {
      hideError(formElement, inputElement);
    }
  };

  const checkInputValidity = (inputList) => {
    return inputList.every((inputElement) => {
      return (inputElement.validity.valid);
    })
  }

  const toggleButtonState = (inputList, buttonElement) => {
    if (!checkInputValidity(inputList)) {
      buttonElement.classList.add(validationObjects.inactiveButtonClass);
      buttonElement.setAttribute("disabled", "disabled");
    }
    else {
      buttonElement.classList.remove(validationObjects.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  }

  const setInputListeners = (formElement) => {
    const inputList = [...formElement.querySelectorAll(validationObjects.inputSelector)];
    const buttonElement = formElement.querySelector(validationObjects.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

function enableValidation() {
    const formList = [...document.querySelectorAll(validationObjects.formSelector)];
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setInputListeners(formElement);
    })
  };

enableValidation(validationObjects);
