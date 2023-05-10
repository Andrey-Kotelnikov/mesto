// Функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closePopupOverlay); // Слушатель на закрытие кликом по оверлею
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

// Функция открытия попапа картинки
function handleOpenImagePopup(cardData) {
  const imagePopupElement = document.querySelector('.popup_function_image');
  const popupImage = imagePopupElement.querySelector('.popup__image');
  const popupImageText = imagePopupElement.querySelector('.popup__image-text');

  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupImageText.textContent = cardData.name;
  openPopup(imagePopupElement);
}

export { handleOpenImagePopup }