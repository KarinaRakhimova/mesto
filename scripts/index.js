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

//Редактирование профиля//
const profileForm = profilePopup.querySelector('.popup__form');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');

const editProfileButton = document.querySelector('.profile__edit');
const closeProfileButton = profilePopup.querySelector('.popup__close');
const saveProfileButton = profilePopup.querySelector('.popup__save');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

function editProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  profilePopup.classList.add('popup_opened');
};

editProfileButton.addEventListener('click', editProfile);

function closeProfile() {
  profilePopup.classList.remove('popup_opened');
};

closeProfileButton.addEventListener('click', closeProfile);

function saveProfileChanges(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeProfile();
};
saveProfileButton.addEventListener('click', saveProfileChanges);

//создание разметки карточки//
const elementTemplate = document.querySelector('.element-template').content;
const elementsList = document.querySelector('.elements__list');

function addElementHTML(card) {
  const elementItem = elementTemplate.cloneNode(true);
  elementItem.querySelector('.element__heading').textContent = card.name;
  elementItem.querySelector('.element__image').alt = card.name;
  elementItem.querySelector('.element__image').src = card.link;
  elementItem.querySelector('.element__image').addEventListener('click', openImagePopup);
  elementItem.querySelector('.element__like').addEventListener('click', likeClicked);
  elementItem.querySelector('.element__delete').addEventListener('click', deleteClicked);

  elementsList.prepend(elementItem);
};

function likeClicked(evt) {
  evt.target.classList.toggle('element__like_active');
};

function deleteClicked(evt) {
  evt.target.parentElement.remove();
};

initialCards.forEach(addElementHTML);

//Добавление новой карточки//
const elementForm = elementPopup.querySelector('.popup__form');
const addElementButton = document.querySelector('.add-element');
const closeElementButton = elementPopup.querySelector('.popup__close');
const saveElementButton = elementPopup.querySelector('.popup__save');

const elementName = elementForm.querySelector('.popup__input_type_element-name');
const elementLink = elementForm.querySelector('.popup__input_type_element-link');

function addElement() {
  elementName.value = "";
  elementLink.value = "";
  elementPopup.classList.add('popup_opened');
};

addElementButton.addEventListener('click', addElement);

function closeElement() {
  elementPopup.classList.remove('popup_opened');
};

closeElementButton.addEventListener('click', closeElement);

function saveElementChanges(evt) {
  evt.preventDefault();
  elementForm.name = elementName.value;
  elementForm.link = elementLink.value;
  addElementHTML(elementForm);
  closeElement();
}

saveElementButton.addEventListener('click', saveElementChanges);

//Открытие картинки//
const closeImagePopupButton = imagePopup.querySelector('.popup__close');
const image = imagePopup.querySelector('.popup__image');
const caption = imagePopup.querySelector('.popup__caption');
const elementHeading = document.querySelector('.element__heading');

function openImagePopup(evt) {
  image.src = evt.target.src;
  caption.textContent = evt.target.alt;
  imagePopup.classList.add('popup_opened');
}

function closeImagePopup() {
  imagePopup.classList.remove('popup_opened');
}

closeImagePopupButton.addEventListener('click', closeImagePopup);
