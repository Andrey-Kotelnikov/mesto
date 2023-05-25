import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
  initialCards,
  validationConfig,
  formEditProfile,
  formAddCard,
  popupEditProfileButton,
  popupAddCardButton
} from '../utils/const.js';
import Section from '../components/Section.js';
//import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

// Функция создания карточки
const createCard = ({name, link}) => {
  const card = new Card(
    {name, link},
    '.template',
    (name, link) => {popupImage.open(name, link);
  });
  return card.generateCard();
}

// Создаем контейнер с карточками
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
}}, '.elements');

cardList.renderItems();

const popupImage = new PopupWithImage('.popup_function_image');
popupImage.setEventListeners();

const profileInfo = new UserInfo({
  nameSelector: '.profile__title', 
  statusSelector: '.profile__subtitle'
})

const popupAddCard = new PopupWithForm('.popup_function_add-card', (data) => {
  const newCard = createCard(data)
  cardList.addItem(newCard)
})

popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm('.popup_function_edit-profile', (data) => {
  profileInfo.setUserInfo(data);
});

popupEditProfile.setEventListeners();

const formEditProfileInstance = new FormValidator(formEditProfile, validationConfig);
formEditProfileInstance.enableValidation();

const formAddCardInstance = new FormValidator(formAddCard, validationConfig);
formAddCardInstance.enableValidation();

// Слушатель на кнопку редактирования профиля
popupEditProfileButton.addEventListener('click', () => {
  popupEditProfile.setInputValues(profileInfo.getUserInfo());
  formEditProfileInstance.disableButton();
  formEditProfileInstance.hideErrors()
  popupEditProfile.open();
});

// Слушатель на кнопку добавления карточки
popupAddCardButton.addEventListener('click', () => {
  formAddCardInstance.hideErrors();
  popupAddCard.open();
});



//const altayImage = new URL('./images/altay.jpg', import.meta.url);

//const whoIsTheGoat = [
//  { name: 'Michael Jordan', image: altayImage }
//]