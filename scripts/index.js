const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//объявление попапов//
const profilePopup = document.querySelector('.popup_type_profile');
const elementPopup = document.querySelector('.popup_type_element');
const imagePopup = document.querySelector('.popup_type_element-image');

// открытие/закрытие попапов//
const closeByOverlayClick = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target)
  };
}

const closeByEsc = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closeByOverlayClick);
  document.addEventListener('keydown', closeByEsc);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closeByOverlayClick);
  document.removeEventListener('keydown', closeByEsc);
};

const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//редактирование профиля//
const editProfileButton = document.querySelector('.profile__edit');
const saveProfileButton = profilePopup.querySelector('.popup__save');

const profileForm = document.forms['profile-form'];
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

editProfileButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(profilePopup);
});

function saveProfileChanges(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profilePopup);
};

profileForm.addEventListener('submit', saveProfileChanges);

//добавление карточки//
const elementTemplate = document.querySelector('.element-template').content.querySelector('.element');
const elementsList = document.querySelector('.elements__list');

const addElementButton = document.querySelector('.add-element');
const saveElementButton = elementPopup.querySelector('.popup__save');

const elementForm = document.forms['element-form'];
const elementName = elementForm.querySelector('.popup__input_type_element-name');
const elementLink = elementForm.querySelector('.popup__input_type_element-link');

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

initialCards.forEach((card) => addElement(card, elementsList));

function toggleLike(evt) {
  evt.target.classList.toggle('element__like_active');
};

function deleteElement(evt) {
  evt.target.closest('.element').remove();
};

addElementButton.addEventListener('click', () => openPopup(elementPopup));

function saveElementChanges(evt) {
  evt.preventDefault();
  elementForm.name = elementName.value;
  elementForm.link = elementLink.value;
  addElement(elementForm, elementsList);
  evt.target.reset();
  closePopup(elementPopup);
};

elementForm.addEventListener('submit', saveElementChanges);

//открытие картинки//
const imageOpened = imagePopup.querySelector('.popup__image');
const imageOpenedCaption = imagePopup.querySelector('.popup__caption');

function openImagePopup(card) {
  imageOpened.src = card.link;
  imageOpened.alt = card.name;
  imageOpenedCaption.textContent = card.name;
  openPopup(imagePopup);
};
