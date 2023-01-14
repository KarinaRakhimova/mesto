import Card from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import FormValidator from './formValidator.js'
import { initialCards, validationObjects } from './const.js'
import { profileEditButton, profileForm, elementForm, elementAddButton } from './utils.js'

//валидация форм
const profileFormValidator = new FormValidator(validationObjects, profileForm);
profileFormValidator.enableValidation();
const elementFormValidator = new FormValidator(validationObjects, elementForm);
elementFormValidator.enableValidation();

//карточки
const elementPopup = new PopupWithForm('.popup_type_element', createCardItem);

elementAddButton.addEventListener('click', () => {
  elementPopup.openPopup();
  elementFormValidator.toggleButtonState()
});

//создание секции с карточками
const elementsSection = new Section({
  items: initialCards,
  renderer: item => createCardItem(item)
}, '.elements__list')

elementsSection.renderItems();

//функция создания карточки
function createCardItem(cardInfo) {
  const newCard = new Card(cardInfo, () => openPopupWithImage(cardInfo));
  const newCardElement = newCard.render();
  elementsSection.addItem(newCardElement)
}

//функция открытия попапа с изображением
function openPopupWithImage(card) {
  const imageOpened = new PopupWithImage('.popup_type_element-image', card);
  imageOpened.openPopup();
}

//профиль
const profilePopup = new PopupWithForm('.popup_type_profile', handleProfileChanges);

profileEditButton.addEventListener('click', () => {
  profilePopup.openPopup();
  const newUser = new UserInfo('.popup__input_type_name', '.popup__input_type_description');
  newUser.getUserInfo();
  const inputs = [...profileForm.querySelectorAll('.popup__input')];
  inputs.forEach((input) => profileFormValidator.hideError(input));
});

function handleProfileChanges(someInfo) {
  const newUser = new UserInfo('.popup__input_type_name', '.popup__input_type_description');
  newUser.setUserInfo(someInfo);
 }






