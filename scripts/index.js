import { Card } from './cards.js'
import { FormValidator } from './formValidator.js'
import { initialCards, validationObjects } from './const.js';

//объявление попапов//
const profilePopup = document.querySelector('.popup_type_profile');
const elementPopup = document.querySelector('.popup_type_element');

const popups = [...document.querySelectorAll('.popup')];
const closeButtons = document.querySelectorAll('.popup__close');

const profileEditButton = document.querySelector('.profile__edit');

const profileForm = document.forms['profile-form'];
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const elementsContainer = document.querySelector('.elements__list');

const elementAddButton = document.querySelector('.add-element');
const elementSaveButton = elementPopup.querySelector('.popup__save');

const elementForm = document.forms['element-form'];
const elementName = elementForm.querySelector('.popup__input_type_element-name');
const elementLink = elementForm.querySelector('.popup__input_type_element-link');

// открытие/закрытие попапов//

const handleCloseByOverlayClick = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target)
  };
};

const handleCloseByEsc = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
};

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleCloseByEsc);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleCloseByEsc);
};

popups.forEach((popup) => popup.addEventListener('mousedown', handleCloseByOverlayClick));

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//профиль

const profileFormValidator = new FormValidator(validationObjects, profileForm);
profileFormValidator.enableValidation();

profileEditButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  const inputs = [...profileForm.querySelectorAll('.popup__input')];
  inputs.forEach((input) => { profileFormValidator._hideError(input) })
  openPopup(profilePopup);
});

function handleProfileChanges(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profilePopup);
};

profileForm.addEventListener('submit', handleProfileChanges);

//добавление карточки
const elementFormValidator = new FormValidator(validationObjects, elementForm);
elementFormValidator.enableValidation();

elementAddButton.addEventListener('click', () => openPopup(elementPopup));

function handleElementChanges(evt) {
  evt.preventDefault();
  addCard({ name: elementName.value, link: elementLink.value }, '.element-template', elementsContainer)
  evt.target.reset();
  const inputs = [...elementForm.querySelectorAll('.popup__input')];
  elementFormValidator._toggleButtonState(inputs, elementSaveButton)
  closePopup(elementPopup);
};

elementForm.addEventListener('submit', handleElementChanges);

function addCard(card, selector, container) {
  const newCard = new Card(card, selector)
  const cardItem = newCard.render();
  container.prepend(cardItem)
}

initialCards.forEach((card) => addCard(card, '.element-template', elementsContainer))

// const formList = [...document.forms];
// function validateForm(settings, form) {
//   const newFormValidator = new FormValidator(settings, form);
//   newFormValidator.enableValidation();
// }
// formList.forEach((form) => validateForm(validationObjects, form))
