import './index.css';
import { validationObjects, cardSelectors } from '../scripts/const.js'
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';
import UserInfo from '../scripts/components/UserInfo.js';
import FormValidator from '../scripts/components/FormValidator.js'
import { profileAvatar, avatarForm, profileEditButton, profileForm, elementForm, elementAddButton, nameInput, jobInput } from '../scripts/utils.js'
import Api from '../scripts/components/Api.js';

const testSection = new Section(createCardItem, '.elements__list')
const userInfo  = new UserInfo('.profile__name', '.profile__description');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '3f5d2b4a-7874-41d6-a2f5-b674954a74cc',
    'Content-Type': 'application/json'
  }
})

let myId
let cardToDelete

//1. Загрузка информации о пользователе с сервера
//2. Загрузка карточек с сервера
Promise.all([api.getInitialProfile(), api.getInitialCards()])
.then(([profileInfo, cardsInfo]) => {
  userInfo.setUserInfo(profileInfo);
  profileAvatar.src = profileInfo.avatar;
  myId=profileInfo._id;
  testSection.renderItems(cardsInfo)
})
.catch(err => console.log(`Ошибка ${err}`))

//валидация форм
const profileFormValidator = new FormValidator(validationObjects, profileForm);
profileFormValidator.enableValidation();
const elementFormValidator = new FormValidator(validationObjects, elementForm);
elementFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(validationObjects, avatarForm);
avatarFormValidator.enableValidation();

//создание попапов
const elementPopup = new PopupWithForm('.popup_type_element', cardSubmit);
elementPopup.setEventListeners();
const profilePopup = new PopupWithForm('.popup_type_profile', handleProfileChanges);
profilePopup.setEventListeners();
const popupImage = new PopupWithImage('.popup_type_element-image');
popupImage.setEventListeners();
const avatarPopup = new PopupWithForm('.popup_type_avatar', updateAvatar);
avatarPopup.setEventListeners();
const confirmPopup = new PopupWithConfirmation('.popup_type_confirm', () => deleteCardItem(cardToDelete));
confirmPopup.setEventListeners();

//функция рендера и добавления карточки на страницу
function createCardItem(cardInfo) {
  const newCard = new Card(cardInfo, cardSelectors, myId, () => openPopupWithImage(cardInfo), confirmDelete, handleLike);
  const newCardElement = newCard.render();
  testSection.addItem(newCardElement);
}

//функция открытия попапа с изображением
function openPopupWithImage(card) {
  popupImage.open(card);
}

//функция открытия попапа с подтверждением
function confirmDelete (cardClicked) {
  confirmPopup.open();
  cardToDelete = cardClicked;
}

//функция удаления карточки
function deleteCardItem(cardToDelete) {
  api.deleteCard(cardToDelete._id)
  .then(cardToDelete.deleteElement())
  .then(confirmPopup.close())
  .catch(err => console.log(`Ошибка ${err}`))
}

//функция лайка
function handleLike(evt, card) {
  const likedByMe = card._likes.find(like => like._id === myId)
  if (likedByMe) {
    card.unlike(evt);
    api.toggleLike(card._id, 'DELETE')
    .then(res => card.updateLikes(res))
    .catch(err => console.log(`Ошибка ${err}`))
  }
  else {
    card.like(evt);
     api.toggleLike(card._id, 'PUT')
    .then(res => card.updateLikes(res))
    .catch(err => console.log(`Ошибка ${err}`))
  }
}

//слушатели
elementAddButton.addEventListener('click', () => {
  elementPopup.open();
  elementFormValidator.removeValidationErrors();
  elementFormValidator.toggleButtonState();
});

profileEditButton.addEventListener('click', () => {
  profilePopup.open();
  profileFormValidator.removeValidationErrors();
  profileFormValidator.toggleButtonState();
  insertInfo();
});

profileAvatar.addEventListener('click', () => {
  avatarPopup.open();
  avatarFormValidator.removeValidationErrors();
  avatarFormValidator.toggleButtonState();
})

//функция вставки данных пользователя в форму при открытии
function insertInfo() {
  const profile = userInfo.getUserInfo();
  nameInput.value = profile.name;
  jobInput.value = profile.job;
}

//функция сабмита формы с профилем
function handleProfileChanges(someInfo) {
  userInfo.setUserInfo(someInfo);
  api.editProfileInfo(someInfo)
  .then(profilePopup.close())
  .catch(err => console.log(`Ошибка ${err}`))
 }

 //сабмит формы с карточкой
function cardSubmit(cardInfo) {
  api.postNewCard(cardInfo)
  .then(res => createCardItem(res))
  .then(elementPopup.close())
  .catch(err => console.log(`Ошибка ${err}`))
}

//функция сабмита формы с аватаром
 function updateAvatar(avatarLink) {
  api.editAvatar(avatarLink)
  .then(data => profileAvatar.src = data.avatar)
  .catch(err => console.log(`Ошибка ${err}`))
  .finally(avatarPopup.close())
 }
