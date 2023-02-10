import Popup from './Popup.js';
export default class PopupWithForm extends Popup {

  constructor(popupSelector, handleSubmit) {
    super(popupSelector, handleSubmit);
    this._handleSubmit = handleSubmit ;
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__save');
    this._submitButtonText = this._submitButton.textContent;
    this._inputList = this._popup.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  _submit = (evt) => {
    evt.preventDefault()
    this._handleSubmit(this._getInputValues())
  }

    //подскажите пожалуйста, как это реализовать?
    // Можно лучше
    // Если будет интересно, можно сделать так,
    // чтобы внутрь обработчика сабмита уходила цепочка
    // промиса (then, finally), чтобы можно было универсально
    // закрывать попапы в then, и возвращать текст кнопки сабмита в finally

    // у меня при реализации ниже выдает ошибку 'Uncaught TypeError: Cannot
    //read properties of undefined (reading 'then')

  // _submit = (evt) => {
  //   evt.preventDefault()
  //   this.renderLoading(true)
  //   this._handleSubmit(this._getInputValues())
  //     .then(() => this.close())
  //     .finally(() => this.renderLoading(false))
  // }

  // function handleSubmit (someInfo) {
  //   api.editProfileInfo(someInfo)
  //     .then(res => userInfo.setUserInfo(res))
  //     .catch(err => console.log(`Ошибка ${err}`));
  // }

  setEventListeners() {
    this._form.addEventListener('submit', this._submit)
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading, loadingText = 'Сохранение...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    }
    else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
