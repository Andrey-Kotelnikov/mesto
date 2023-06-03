import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
  initialCards,
  validationConfig,
  formEditProfile,
  formAddCard,
  formEditAvatar,
  popupEditProfileButton,
  popupAddCardButton,
  popupEditAvatarButton
} from '../utils/const.js';
import Section from '../components/Section.js';
//import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import UserInfo from '../components/UserInfo.js';
import { api } from '../components/Api.js';

// Функция создания карточки
const createCard = (data) => {
  const card = new Card(
    data,
    '.template',
    handleImagePopup,
    handleDeleteCard,
    handleLikeCard,
    handleDislikeCard);
  return card.generateCard();
}



// Открытие попапа с картинкой по клику
function handleImagePopup(name, link) {
  popupImage.open(name, link)
}

// Обработчик удаления карточки
function handleDeleteCard(data, card) {
  console.log(card)
  popupDelete.open();
  popupDelete.handleDeleteButton(() => {
    api.deleteItem(data._id)
      .then(() => {
        card._card.remove();
        card._card = null;
        popupDelete.close();
      })
      .catch((err) => {console.log(err)})
  })
}

function handleLikeCard(card) {
  console.log(card)
  api.like(card.getId())
    .then((res) => {
      card.toggleLike();
      card.likesCounter(res)
    })
    .catch((err) => {console.log(err)})
}

function handleDislikeCard(card) {
  console.log(card)
  api.deleteLike(card.getId())
    .then((res) => {
      card.toggleLike();
      card.likesCounter(res)
    })
    .catch((err) => {console.log(err)})
}

// Создаем контейнер с карточками
const cardList = new Section({
  items: [],
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
}}, '.elements');

cardList.renderItems();

const popupImage = new PopupWithImage('.popup_function_image');
popupImage.setEventListeners();

const popupDelete = new PopupDeleteCard('.popup_function_delete')
popupDelete.setEventListeners();

const profileInfo = new UserInfo({
  nameSelector: '.profile__title', 
  aboutSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
})
profileInfo.getUserInfo()

const popupAddCard = new PopupWithForm('.popup_function_add-card', (data) => {
  popupAddCard.loading(true, 'Сохранение...')
  api.createItem(data)
    .then((res) => {
      console.log(res);
      const newCard = createCard(res)
      cardList.addItemPrepend(newCard)
    })
    .then(() => {
      popupAddCard.close();
    })
    .catch((err) => {console.log(err)})
    .finally(() => {
      popupAddCard.loading(false)
    })
  
})

popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm('.popup_function_edit-profile', (data) => {
  console.log(data)
  popupEditProfile.loading(true, 'Сохранение...')
  api.editProfile(data)
    .then(() => {
      profileInfo.setUserInfo(data);
    })
    .then(() => {
      popupEditProfile.close();
    })
    .catch((err) => {console.log(err)})
    .finally(() => {
      popupEditProfile.loading(false)
    })
});

popupEditProfile.setEventListeners();

const popupEditAvatar = new PopupWithForm('.popup_function_edit-avatar', (data) => {
  console.log(data);
  popupEditAvatar.loading(true, 'Сохранение...')
  api.editAvatar(data)
    .then(() => {
      profileInfo.setAvatar(data);
    })
    .then(() => {
      popupEditAvatar.close();
    })
    .catch((err) => {console.log(err)})
    .finally(() => {
      popupEditAvatar.loading(false)
    })

})

popupEditAvatar.setEventListeners();

const formEditProfileInstance = new FormValidator(formEditProfile, validationConfig);
formEditProfileInstance.enableValidation();

const formAddCardInstance = new FormValidator(formAddCard, validationConfig);
formAddCardInstance.enableValidation();

const formEditAvatarInstance = new FormValidator(formEditAvatar, validationConfig);
formEditAvatarInstance.enableValidation();

// Слушатель на кнопку редактирования профиля
popupEditProfileButton.addEventListener('click', () => {
  popupEditProfile.setInputValues(profileInfo.getUserInfo());
  formEditProfileInstance.disableButton();
  formEditProfileInstance.hideErrors()
  popupEditProfile.open();
});

// Слушатель на кнопку добавления карточки
popupAddCardButton.addEventListener('click', () => {
  formAddCardInstance.disableButton();
  formAddCardInstance.hideErrors();
  popupAddCard.open();
});

// Слушатель на кнопку редактирования аватара
popupEditAvatarButton.addEventListener('click', () => {
  //popupEditAvatar.setEventListeners(profileInfo.getAvatar())
  formEditAvatarInstance.disableButton();
  formEditAvatarInstance.hideErrors();
  popupEditAvatar.open();
})

api.getItems()
.then((res) => {
  console.log(res)
  res.forEach((item) => {
    const newCard = createCard(item)
    cardList.addItemAppend(newCard)
  })
})
.catch((err) => {console.log(err)})

api.getProfile()
  .then((res) => {
    profileInfo.setUserInfo({name: res.name, about: res.about})
  })
  .catch((err) => {console.log(err)})

api.getAvatar()
  .then((res) => {
    profileInfo.setAvatar({avatar: res.avatar})
  })
  .catch((err) => {console.log(err)})