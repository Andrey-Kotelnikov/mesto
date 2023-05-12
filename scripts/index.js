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

const imagePopupElement = document.querySelector('.popup_function_image');
const popupImage = imagePopupElement.querySelector('.popup__image');
const popupImageText = imagePopupElement.querySelector('.popup__image-text');

const formEditProfile = document.querySelector('.popup_function_edit-profile');
const formAddCard = document.querySelector('.popup_function_add-card');

const formEditProfileInstance = new FormValidator(formEditProfile, validationConfig);
const formAddCardInstance = new FormValidator(formAddCard, validationConfig);

formEditProfileInstance.enableValidation();
formAddCardInstance.enableValidation();

function openImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupImageText.textContent = cardData.name;
  openPopup(imagePopupElement);
}

const createCard = (item) => {
  const card = new Card(item, '.template', openImagePopup);
  return card.generateCard();
  console.log(item);
};

initialCards.forEach((item) => {
  elements.prepend(createCard(item));
})

// Функция открытия попапа добавления карточек
function openAddPopup() {
  locationInput.value = '';
  imageLinkInput.value = '';
  openPopup(popupAddCardElement);
  formAddCardInstance.disableButton();
}

// Функция добавления карточки
function addCard(evt) {
  evt.preventDefault();
  const newCard = createCard({name: locationInput.value, link: imageLinkInput.value}, '.template');
  elements.prepend(newCard);
  closePopup(popupAddCardElement)
}

// Функция открытия попапа редактирования профиля
function openEditPopup() {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  openPopup(popupProfileElement);
  formEditProfileInstance.disableButton();
}

// Функция изменения имени и статуса
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileNameElement.textContent = nameInput.value;
    profileJobElement.textContent = jobInput.value;
    closePopup(popupProfileElement);
}

// Функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc); // Слушатель на закрытие нажатием esc
}

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

// Обработчик попапов
document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('click', closePopupOverlay); // Слушатель на закрытие кликом по оверлею
});

popupProfileOpenButtonElement.addEventListener('click', openEditPopup);
popupProfileFormElement.addEventListener('submit', handleProfileFormSubmit);

popupAddCardOpenButtonElement.addEventListener('click', openAddPopup);
popupAddCardFormElement.addEventListener('submit', addCard);