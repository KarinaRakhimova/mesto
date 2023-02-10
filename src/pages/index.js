import './index.css';
import { validationObjects, cardSelectors } from '../scripts/const.js'
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';
import UserInfo from '../scripts/components/UserInfo.js';
import FormValidator from '../scripts/components/FormValidator.js'
import { profileAvatar, profileEditButton, elementAddButton, nameInput, jobInput } from '../scripts/utils.js'
import Api from '../scripts/components/Api.js';

let cardToDelete
const cardSection = new Section(renderCard, '.elements__list')
const userInfo = new UserInfo('.profile__name', '.profile__description', '.profile__avatar');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '3f5d2b4a-7874-41d6-a2f5-b674954a74cc',
    'Content-Type': 'application/json'
  }
})

//1. Загрузка информации о пользователе с сервера
//2. Загрузка карточек с сервера
Promise.all([api.getInitialProfile(), api.getInitialCards()])
  .then(([profileInfo, cardsInfo]) => {
    userInfo.setUserInfo(profileInfo);
    cardSection.renderItems(cardsInfo);
  })
  .catch(err => console.log(`Ошибка ${err}`))

//валидация форм
const formValidators = {}

function validateAllForms(config) {
  const formList = [...document.querySelectorAll(config.formSelector)]
  formList.forEach(form => {
    const formValidator = new FormValidator(config, form);
    const formName = form.getAttribute('name');
    formValidators[formName] = formValidator;
    formValidator.enableValidation();
  })
}

validateAllForms(validationObjects);

// const profileFormValidator = new FormValidator(validationObjects, profileForm);
// profileFormValidator.enableValidation();
// const elementFormValidator = new FormValidator(validationObjects, elementForm);
// elementFormValidator.enableValidation();
// const avatarFormValidator = new FormValidator(validationObjects, avatarForm);
// avatarFormValidator.enableValidation();

//создание попапов
const elementPopup = new PopupWithForm('.popup_type_element', submitCard);
elementPopup.setEventListeners();
const profilePopup = new PopupWithForm('.popup_type_profile', handleProfileChanges);
profilePopup.setEventListeners();
const popupImage = new PopupWithImage('.popup_type_element-image');
popupImage.setEventListeners();
const avatarPopup = new PopupWithForm('.popup_type_avatar', updateAvatar);
avatarPopup.setEventListeners();
const confirmPopup = new PopupWithConfirmation('.popup_type_confirm', () => deleteCardItem(cardToDelete));
confirmPopup.setEventListeners();

//функция рендера карточки
function renderCard(cardInfo) {
  const newCard = new Card(cardInfo, cardSelectors, userInfo._id, () => openPopupWithImage(cardInfo), confirmDelete, handleLike);
  const newCardElement = newCard.render();
  return newCardElement;
}

//функция добавления карточки на страницу
function createCardItem(cardInfo) {
  const cardItem = renderCard(cardInfo);
  cardSection.addItem(cardItem);
}

//функция открытия попапа с изображением
function openPopupWithImage(card) {
  popupImage.open(card);
}

//функция открытия попапа с подтверждением
function confirmDelete(cardClicked) {
  confirmPopup.open();
  cardToDelete = cardClicked;
}

//функция удаления карточки
function deleteCardItem(cardToDelete) {
  api.deleteCard(cardToDelete._id)
    .then(() => {
      cardToDelete.deleteElement();
      confirmPopup.close();
    })
    .catch(err => console.log(`Ошибка ${err}`))
}

//функция лайка
function handleLike(evt, card) {
  const likedByMe = card._likes.find(like => like._id === userInfo._id)
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
  formValidators['element-form'].resetValidation();
});

profileEditButton.addEventListener('click', () => {
  profilePopup.open();
  formValidators['profile-form'].resetValidation();
  insertInfo();
});

profileAvatar.addEventListener('click', () => {
  avatarPopup.open();
  formValidators['avatar-form'].resetValidation();
})

//функция вставки данных пользователя в форму при открытии
function insertInfo() {
  const profile = userInfo.getUserInfo();
  nameInput.value = profile.name;
  jobInput.value = profile.job;
}

//функция сабмита формы с профилем
function handleProfileChanges(someInfo) {
  profilePopup.renderLoading(true)
  api.editProfileInfo(someInfo)
    .then(res => userInfo.setUserInfo(res))
    .then(() => profilePopup.close())
    .finally(() => profilePopup.renderLoading(false))
    .catch(err => console.log(`Ошибка ${err}`));
}

//сабмит формы с карточкой
function submitCard(cardInfo) {
  elementPopup.renderLoading(true)
  api.postNewCard(cardInfo)
    .then(res => createCardItem(res))
    .then(() => elementPopup.close())
    .finally(() => elementPopup.renderLoading(false))
    .catch(err => console.log(`Ошибка ${err}`))
}

//функция сабмита формы с аватаром
function updateAvatar(avatarLink) {
  avatarPopup.renderLoading(true)
  api.editAvatar(avatarLink)
    .then(res => userInfo._avatar.src = res.avatar)
    .then(() => avatarPopup.close())
    .finally(() => avatarPopup.renderLoading(false))
    .catch(err => console.log(`Ошибка ${err}`))
}
