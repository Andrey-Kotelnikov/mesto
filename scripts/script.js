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
const template = document.querySelector('.template').content;

const imagePopupElement = document.querySelector('.popup_function_image');

const popupImage = imagePopupElement.querySelector('.popup__image');
const popupImageText = imagePopupElement.querySelector('.popup__image-text'); 

// Функция создания карточек
createCard = (item) => {
  const htlmElement = template.cloneNode(true);

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

// Проходим по массиву
initialCards.forEach((item) => {
  renderCard(createCard(item));
});

// Функция открытия попапа добавления
function openAddPopup() {
  locationInput.value = '';
  imageLinkInput.value = '';
  openPopup(popupAddCardElement);
}

// Функция добавления карточки
function addCard(evt) {
  evt.preventDefault();
  const newCard = createCard({name: locationInput.value, link: imageLinkInput.value});
  renderCard(newCard);
  closePopup(popupAddCardElement)
}

// Функция добавления и удаления лайка
function handleLikeButton(event) {
  const likeButton = event.target.closest('.element__like');
  likeButton.classList.toggle('element__like_active');
}

// Функция удаления карточки
function deleteCard(event) {
  card = event.target.closest('.element');
  card.remove();
}

// Функция открытия попапа редактирования профиля
function openEditPopup() {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  openPopup(popupProfileElement);
}

// Функция изменения имени и статуса
function handleFormSubmit (evt) {
    evt.preventDefault();
    profileNameElement.textContent = nameInput.value;
    profileJobElement.textContent = jobInput.value;
    closePopup(popupProfileElement);
}

// Функция открытия попапа картинки
function openImagePopup(event) {
  const imageElement = event.target.closest('.element__image');
  openPopup(imagePopupElement);
  popupImage.src = imageElement.src;
  popupImage.alt = imageElement.alt
  popupImageText.textContent = imageElement.alt;
}

// Функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Обработчик всех крестиков закрытия
document.querySelectorAll('.popup__close-button').forEach(button => {
  const buttonsPopup = button.closest('.popup'); // нашли родителя с нужным классом
  button.addEventListener('click', () => closePopup(buttonsPopup)); // закрыли попап
});

popupProfileOpenButtonElement.addEventListener('click', openEditPopup);
popupProfileFormElement.addEventListener('submit', handleFormSubmit);

popupAddCardOpenButtonElement.addEventListener('click', openAddPopup);
popupAddCardFormElement.addEventListener('submit', addCard);