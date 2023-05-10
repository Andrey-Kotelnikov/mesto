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

export { initialCards, validationConfig }