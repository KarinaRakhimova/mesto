import './index.css';
import { initialCards, validationObjects, cardSelectors } from '../scripts/const.js'
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import FormValidator from '../scripts/components/FormValidator.js'
import { profileEditButton, profileForm, elementForm, elementAddButton, nameInput, jobInput } from '../scripts/utils.js'

//валидация форм
const profileFormValidator = new FormValidator(validationObjects, profileForm);
profileFormValidator.enableValidation();
const elementFormValidator = new FormValidator(validationObjects, elementForm);
elementFormValidator.enableValidation();

//создание попапов
const elementPopup = new PopupWithForm('.popup_type_element', createCardItem);
elementPopup.setEventListeners();
const profilePopup = new PopupWithForm('.popup_type_profile', handleProfileChanges);
profilePopup.setEventListeners();
const popupImage = new PopupWithImage('.popup_type_element-image');
popupImage.setEventListeners();

//создание секции с карточками
const elementsSection = new Section({
  items: initialCards,
  renderer: createCardItem
}, '.elements__list')

elementsSection.renderItems();

//функция создания карточки

export function createCardItem(cardInfo) {
  const newCard = new Card(cardInfo, cardSelectors, () => openPopupWithImage(cardInfo));
  const newCardElement = newCard.render();
  elementsSection.addItem(newCardElement)
}

//функция открытия попапа с изображением

function openPopupWithImage(card) {
  popupImage.open(card);
}

//слушатели
elementAddButton.addEventListener('click', () => {
  elementPopup.open();
  elementFormValidator.toggleButtonState()
});

profileEditButton.addEventListener('click', () => {
  profilePopup.open();
  profileFormValidator.removeValidationErrors();
  insertInfo();
});

//профиль

const newUser = new UserInfo('.profile__name', '.profile__description');

//функция вставки данных пользователя в форму при открытии
function insertInfo() {
  const profile = newUser.getUserInfo();
  nameInput.value = profile.name;
  jobInput.value = profile.job;
}

//функция сабмита формы с профилем
function handleProfileChanges(someInfo) {
  newUser.setUserInfo(someInfo);
 }
