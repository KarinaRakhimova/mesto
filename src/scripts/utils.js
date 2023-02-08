const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit');
const profileAvatar = document.querySelector('.profile__avatar');
const profileForm = document.forms['profile-form'];
const avatarForm = document.forms['avatar-form'];

const elementForm = document.forms['element-form'];
const elementAddButton = document.querySelector('.add-element');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');

export {profileName, profileDescription, profileAvatar, avatarForm, profileEditButton, profileForm, elementForm, elementAddButton, nameInput, jobInput}
