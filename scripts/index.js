//объявление попапов//
const profilePopup = document.querySelector('.popup_type_profile');
const elementPopup = document.querySelector('.popup_type_element');
const imagePopup = document.querySelector('.popup_type_element-image');

const popups = [...document.querySelectorAll('.popup')];
const closeButtons = document.querySelectorAll('.popup__close');

const profileEditButton = document.querySelector('.profile__edit');
const profileSaveButton = profilePopup.querySelector('.popup__save');

const profileForm = document.forms['profile-form'];
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const elementTemplate = document.querySelector('.element-template').content.querySelector('.element');
const elementsContainer = document.querySelector('.elements__list');

const elementAddButton = document.querySelector('.add-element');
const elementSaveButton = elementPopup.querySelector('.popup__save');

const elementForm = document.forms['element-form'];
const elementName = elementForm.querySelector('.popup__input_type_element-name');
const elementLink = elementForm.querySelector('.popup__input_type_element-link');

const imageOpened = imagePopup.querySelector('.popup__image');
const imageOpenedCaption = imagePopup.querySelector('.popup__caption');

// открытие/закрытие попапов//

const handleCloseByOverlayClick = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target)
  };
}

const handleCloseByEsc = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleCloseByEsc);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleCloseByEsc);
};

//редактирование профиля//

function handleProfileChanges(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profilePopup);
};

//добавление карточки//

function addElementHTML(card) {
  const elementItem = elementTemplate.cloneNode(true);
  const elementImage = elementItem.querySelector('.element__image');
  elementImage.src = card.link;
  elementImage.alt = card.name;
  elementItem.querySelector('.element__heading').textContent = card.name;
  elementItem.querySelector('.element__like').addEventListener('click', toggleLike);
  elementItem.querySelector('.element__delete').addEventListener('click', deleteElement);
  elementImage.addEventListener('click', () => openImagePopup(card));
  return elementItem;
};

function addElement(card, list) {
  const newCard = addElementHTML(card);
  list.prepend(newCard);
};

function toggleLike(evt) {
  evt.target.classList.toggle('element__like_active');
};

function deleteElement(evt) {
  evt.target.closest('.element').remove();
};

function handleElementChanges(evt) {
  evt.preventDefault();
  elementForm.name = elementName.value;
  elementForm.link = elementLink.value;
  addElement(elementForm, elementsContainer);
  evt.target.reset();
  elementSaveButton.setAttribute("disabled", "disabled");
  elementSaveButton.classList.add('popup__save_disabled');
  closePopup(elementPopup);
};

//открытие картинки//
function openImagePopup(card) {
  imageOpened.src = card.link;
  imageOpened.alt = card.name;
  imageOpenedCaption.textContent = card.name;
  openPopup(imagePopup);
};

initialCards.forEach((card) => addElement(card, elementsContainer));

popups.forEach((popup) => popup.addEventListener('click', handleCloseByOverlayClick));

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

profileForm.addEventListener('submit', handleProfileChanges);

profileEditButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(profilePopup);
});

elementForm.addEventListener('submit', handleElementChanges);
elementAddButton.addEventListener('click', () => openPopup(elementPopup));
