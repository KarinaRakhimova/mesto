let editButton = document.querySelector('.profile__edit_open');
let closeButton = document.querySelector('.profile__edit_close');
let popup = document.querySelector('.popup');

editButton.addEventListener('click', function() {
  popup.classList.add('popup_opened');
});

closeButton.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
});


let popupElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_name');
let descriptionInput = document.querySelector('.popup__input_description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
nameInput.value = profileName.textContent;
descriptionInput.value = profileDescription.textContent;

function formSubmitHandler (evt) {
	evt.preventDefault();
  profileName.textContent = `${nameInput.value}`;
  profileDescription.textContent = `${descriptionInput.value}`;
  popup.classList.remove('popup_opened');
};

popupElement.addEventListener('submit', formSubmitHandler);

