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

//редактирование профиля//
const editProfileButton = document.querySelector('.profile__edit');
const closeProfileButton = profilePopup.querySelector('.popup__close');
const saveProfileButton = profilePopup.querySelector('.popup__save');

const profileForm = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

editProfileButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(profilePopup);
});

closeProfileButton.addEventListener('click', () => closePopup(profilePopup));

function saveProfileChanges(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profilePopup);
}

saveProfileButton.addEventListener('click', saveProfileChanges);

//добавление карточки//
const elementTemplate = document.querySelector('.element-template').content;
const elementsList = document.querySelector('.elements__list');

const addElementButton = document.querySelector('.add-element');
const closeElementButton = elementPopup.querySelector('.popup__close');
const saveElementButton = elementPopup.querySelector('.popup__save');

const elementForm = elementPopup.querySelector('.popup__form');
const elementName = elementForm.querySelector('.popup__input_type_element-name');
const elementLink = elementForm.querySelector('.popup__input_type_element-link');

function addElementHTML(card) {
  const elementItem = elementTemplate.querySelector('.element').cloneNode(true);
  elementItem.querySelector('.element__image').src = card.link;
  elementItem.querySelector('.element__image').alt = card.name;
  elementItem.querySelector('.element__heading').textContent = card.name;
  elementItem.querySelector('.element__like').addEventListener('click', likeClicked);
  elementItem.querySelector('.element__delete').addEventListener('click', deleteClicked);
  elementItem.querySelector('.element__image').addEventListener('click', openImagePopup);
  elementsList.prepend(elementItem);
}

function likeClicked(evt) {
  evt.target.classList.toggle('element__like_active');
}

function deleteClicked(evt) {
  evt.target.parentElement.remove();
}

initialCards.forEach(addElementHTML);

addElementButton.addEventListener('click', function () {
  elementName.value = "";
  elementLink.value = "";
  openPopup(elementPopup);
});

closeElementButton.addEventListener('click', () => closePopup(elementPopup));

function saveElementChanges(evt) {
  evt.preventDefault();
  elementForm.name = elementName.value;
  elementForm.link = elementLink.value;
  addElementHTML(elementForm);
  closePopup(elementPopup);
}
saveElementButton.addEventListener('click', saveElementChanges);

//открытие картинки//
const imageOpened = imagePopup.querySelector('.popup__image');
const imageOpenedCaption = imagePopup.querySelector('.popup__caption');
const closeImagePopupButton = imagePopup.querySelector('.popup__close');

function openImagePopup(evt) {
  imageOpened.src = evt.target.src;
  imageOpenedCaption.textContent = evt.target.alt;
  openPopup(imagePopup);
}

closeImagePopupButton.addEventListener('click', () => closePopup(imagePopup));
