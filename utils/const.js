// Массив карточек
const initialCards = [
  {
    name: 'Эльбрус',
    link: '../images/elbrus.jpg'
  },
  {
    name: 'Домбай',
    link: '../images/dombay.jpg'
  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Алтай',
    link: '../images/altay.jpg'
  },
  {
    name: 'Дагестан',
    link: '../images/dagestan.jpg'
  },
  {
    name: 'Камчатский край',
    link: '../images/kamchatka.jpg'
  }
];

const validationConfig = {
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__text_type_error'
};

const formEditProfile = document.querySelector('.popup_function_edit-profile');
const formAddCard = document.querySelector('.popup_function_add-card');

const popupEditProfileButton = document.querySelector('.profile__edit-button');
const popupAddCardButton = document.querySelector('.profile__add-button');

export { initialCards, validationConfig, formEditProfile, formAddCard, popupEditProfileButton, popupAddCardButton }