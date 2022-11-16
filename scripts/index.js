let popupElement = document.querySelector('.popup');

let editButton = document.querySelector('.profile__edit');
let saveButton = popupElement.querySelector('.popup__save');
let closeButton = popupElement.querySelector('.popup__close');
let addButton = popupElement.querySelector('.profile__add');

let formElement = popupElement.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_description');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function editProfile() {
  popupElement.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
};

addButton.addEventListener('click', editProfile);

editButton.addEventListener('click', editProfile);

function closePopup() {
  popupElement.classList.remove('popup_opened');
};

closeButton.addEventListener('click', closePopup);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = `${nameInput.value}`;
  profileDescription.textContent = `${jobInput.value}`;
  closePopup();
};

saveButton.addEventListener('click', formSubmitHandler);
