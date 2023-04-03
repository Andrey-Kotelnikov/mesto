const popupElement = document.querySelector('.popup');

const editPopupElement = document.querySelector('.popup_function_edit-profile');
const editPopupCloseButtonElement = editPopupElement.querySelector('.popup__close-button');
const editPopupOpenButtonElement = document.querySelector('.profile__edit-button');
const editPopupFormElement = editPopupElement.querySelector('.popup__content');

const addPopupElement = document.querySelector('.popup_function_add-card');
const addPopupCloseButtonElement = addPopupElement.querySelector('.popup__close-button');
const addPopupOpenButtonElement = document.querySelector('.profile__add-button');
const addPopupFormElement = addPopupElement.querySelector('.popup__content');

const nameInput = editPopupElement.querySelector('.popup__text_type_name');
const jobInput = editPopupElement.querySelector('.popup__text_type_status');

const locationInput = addPopupElement.querySelector('.popup__text_type_location');
const imageLinkInput = addPopupElement.querySelector('.popup__text_type_image-link');

const profileNameElement = document.querySelector('.profile__title');
const profileJobElement = document.querySelector('.profile__subtitle');

const elements = document.querySelector('.elements');
const template = document.querySelector('.template').content;

const imagePopupElement = document.querySelector('.popup_function_image');
const imagePopupCloseButtonElement = imagePopupElement.querySelector('.popup__close-button');

const popupImage = imagePopupElement.querySelector('.popup__image');
const popupImageText = imagePopupElement.querySelector('.popup__image-text');

// Массив карточек
const initialCards = [
  {
    name: 'Эльбрус',
    link: './images/elbrus.jpg'
  },
  {
    name: 'Домбай',
    link: './images/dombay.jpg'
  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Алтай',
    link: './images/altay.jpg'
  },
  {
    name: 'Дагестан',
    link: './images/dagestan.jpg'
  },
  {
    name: 'Камчатский край',
    link: './images/kamchatka.jpg'
  }
];

// Функция отображения карточек на странице
renderItem = (item) => {
  const htlmElement = template.cloneNode(true);

  const templateImage = htlmElement.querySelector('.element__image');
  const templateTitle = htlmElement.querySelector('.element__title');

  templateImage.src = item.link;
  templateImage.alt = item.name;
  templateTitle.textContent = item.name;

  // Слушатель на корзину
  setEventListener(htlmElement);

  // Слушатель на лайк
  likeListener(htlmElement);

  // Слушатель на картинку
  imageListener(htlmElement);

  elements.prepend(htlmElement);
}

// Проходим по массиву
initialCards.forEach(renderItem)

// Функция открытия попапа добавления
function openAddPopup() {
  locationInput.value = '';
  imageLinkInput.value = '';
  addPopupElement.classList.add('popup_opened');
}

// Функция закрытия попапа добавления
function closeAddPopup() {
  addPopupElement.classList.remove('popup_opened');
}

// Функция добавления карточки
function addCard(evt) {
  evt.preventDefault();
  const newCard = renderItem({
    name: locationInput.value,
    link: imageLinkInput.value
  });
  elements.append(newCard);
  closeAddPopup();
}

// Функция слушателя лайков
function likeListener(htlmElement) {
  htlmElement.querySelector('.element__like').addEventListener('click', likeToggle)
}

// Функция добавления и удаления лайка
function likeToggle(event) {
  const likeButton = event.target.closest('.element__like');
  likeButton.classList.toggle('element__like_active');
}

// Функция удаления карточки
function cardDelete(event) {
  card = event.target.closest('.element');
  card.remove();
}

// Функция слушателя корзины
function setEventListener(htlmElement) {
  htlmElement.querySelector('.element__trash').addEventListener('click', cardDelete);
}

// Функция слушателя попапа картинки
function imageListener(htlmElement) {
  htlmElement.querySelector('.element__image').addEventListener('click', openImagePopup);
}

// Функция открытия попапа редактирования профиля
function openEditPopup() {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  editPopupElement.classList.add('popup_opened');
}

// Функция закрытия попапа редактирования профиля
function closeEditPopup() {
  editPopupElement.classList.remove('popup_opened');
}

// Функция закрытия попапа кликом вне попапа
/*function closeEditPopupByClickOnOverlay (event) {
  console.log(event.target, event.currentTarget);
  if (event.target === event.currentTarget) {
    closeEditPopup();
  }
}*/

// Функция изменения имени и статуса
function handleFormSubmit (evt) {
    evt.preventDefault();

    profileNameElement.textContent = nameInput.value;
    profileJobElement.textContent = jobInput.value;

    closeEditPopup();
}

// Функция открытия попапа картинки
function openImagePopup(event) {
  const imageElement = event.target.closest('.element__image');
  imagePopupElement.classList.add('popup_opened');
  popupImage.src = imageElement.src;
  popupImage.alt = imageElement.alt
  popupImageText.textContent = imageElement.alt;
}

// Функция закрытия попапа картинки
function closeImagePopup() {
  imagePopupElement.classList.remove('popup_opened');
}

editPopupOpenButtonElement.addEventListener('click', openEditPopup);
editPopupCloseButtonElement.addEventListener('click', closeEditPopup);
//popupElement.addEventListener('click', closeEditPopupByClickOnOverlay);
editPopupFormElement.addEventListener('submit', handleFormSubmit);

addPopupOpenButtonElement.addEventListener('click', openAddPopup);
addPopupCloseButtonElement.addEventListener('click', closeAddPopup);
addPopupFormElement.addEventListener('submit', addCard);

imagePopupCloseButtonElement.addEventListener('click', closeImagePopup);





