const elbrusImage = new URL('../images/elbrus.jpg', import.meta.url);
const dombayImage = new URL('../images/dombay.jpg', import.meta.url);
const arkhysImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url);
const altayImage = new URL('../images/altay.jpg', import.meta.url);
const dagestanImage = new URL('../images/dagestan.jpg', import.meta.url);
const kamchatkaImage = new URL('../images/kamchatka.jpg', import.meta.url);

// Массив карточек
const initialCards = [
  {
    name: 'Эльбрус',
    link: elbrusImage
  },
  {
    name: 'Домбай',
    link: dombayImage
  },
  {
    name: 'Архыз',
    link: arkhysImage
  },
  {
    name: 'Алтай',
    link: altayImage
  },
  {
    name: 'Дагестан',
    link: dagestanImage
  },
  {
    name: 'Камчатский край',
    link: kamchatkaImage
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