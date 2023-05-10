import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, validationConfig } from './const.js';

const popupProfileElement = document.querySelector('.popup_function_edit-profile');
const popupProfileOpenButtonElement = document.querySelector('.profile__edit-button');
const popupProfileFormElement = popupProfileElement.querySelector('.popup__content');

const popupAddCardElement = document.querySelector('.popup_function_add-card');
const popupAddCardOpenButtonElement = document.querySelector('.profile__add-button');
const popupAddCardFormElement = popupAddCardElement.querySelector('.popup__content');

const nameInput = popupProfileElement.querySelector('.popup__text_type_name');
const jobInput = popupProfileElement.querySelector('.popup__text_type_status');

const locationInput = popupAddCardElement.querySelector('.popup__text_type_location');
const imageLinkInput = popupAddCardElement.querySelector('.popup__text_type_image-link');

const profileNameElement = document.querySelector('.profile__title');
const profileJobElement = document.querySelector('.profile__subtitle');

const elements = document.querySelector('.elements');

const formEditProfile = document.querySelector('.popup_function_edit-profile');
const formAddCard = document.querySelector('.popup_function_add-card');

const formEditProfileInstance = new FormValidator(formEditProfile, validationConfig);
const formAddCardInstance = new FormValidator(formAddCard, validationConfig);

formEditProfileInstance.enableValidation();
formAddCardInstance.enableValidation();

initialCards.forEach((item) => {
  const card = new Card(item, '.template');
  const cardElement = card.createCard();
  elements.prepend(cardElement);
})

const createCard = (item) => {
  const template = document.querySelector('.template').content;
  const templateCard = template.querySelector('.element');
  const htlmElement = templateCard.cloneNode(true);

  const templateImage = htlmElement.querySelector('.element__image');
  const templateTitle = htlmElement.querySelector('.element__title');

  templateImage.src = item.link;
  templateImage.alt = item.name;
  templateTitle.textContent = item.name;

  htlmElement.querySelector('.element__trash').addEventListener('click', deleteCard); // Слушатель на корзину
  htlmElement.querySelector('.element__like').addEventListener('click', handleLikeButton); // Слушатель на лайк
  htlmElement.querySelector('.element__image').addEventListener('click', openImagePopup); // Слушатель на картинку

  return htlmElement;
}

// Функция добавления карточки на страницу
function renderCard(item) {
  elements.prepend(item);
}

// Функция открытия попапа добавления карточек
function openAddPopup() {
  locationInput.value = '';
  imageLinkInput.value = '';
  openPopup(popupAddCardElement);
  disableButton(popupAddCardElement);
}

// Функция добавления карточки
function addCard(evt) {
  evt.preventDefault();
  const newCard = createCard({name: locationInput.value, link: imageLinkInput.value});
  renderCard(newCard);
  closePopup(popupAddCardElement)
}

// Функция добавления и удаления лайка
function handleLikeButton(evt) {
  const likeButton = evt.target.closest('.element__like');
  likeButton.classList.toggle('element__like_active');
}

// Функция удаления карточки
function deleteCard(evt) {
  card = evt.target.closest('.element');
  card.remove();
}

// Функция открытия попапа редактирования профиля
function openEditPopup() {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  openPopup(popupProfileElement);
  disableButton(popupProfileElement);
}

// Функция изменения имени и статуса
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileNameElement.textContent = nameInput.value;
    profileJobElement.textContent = jobInput.value;
    closePopup(popupProfileElement);
}

// Функция открытия попапа картинки
function openImagePopup(evt) {
  const imageElement = evt.target.closest('.element__image');
  openPopup(imagePopupElement);
  popupImage.src = imageElement.src;
  popupImage.alt = imageElement.alt
  popupImageText.textContent = imageElement.alt;
}

// Функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closePopupOverlay); // Слушатель на закрытие кликом по оверлею
  document.addEventListener('keydown', closePopupEsc); // Слушатель на закрытие нажатием esc
}

// Функция деактивации кнопки при открытии попапа
const disableButton = (popupElement) => {
  const button = popupElement.querySelector('.popup__save-button');
  button.classList.add('popup__save-button_inactive');
  button.setAttribute('disabled', true); // Сделаем кнопку неактивной при открытии
};

// Функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);

}

// Функция закрытия попапов нажатием на esc
const closePopupEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

// Функция закрытия попапов кликом по оверлею
const closePopupOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

// Обработчик крестиков попапов
document.querySelectorAll('.popup__close-button').forEach(button => {
  const buttonsPopup = button.closest('.popup'); // нашли родителя с нужным классом
  button.addEventListener('click', () => closePopup(buttonsPopup)); // закрыли попап
});

popupProfileOpenButtonElement.addEventListener('click', openEditPopup);
popupProfileFormElement.addEventListener('submit', handleProfileFormSubmit);

popupAddCardOpenButtonElement.addEventListener('click', openAddPopup);
popupAddCardFormElement.addEventListener('submit', addCard);