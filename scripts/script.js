let popupElement = document.querySelector('.popup');
let popupFormElement = popupElement.querySelector('.popup__content');
let popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
let popupOpenButtonElement = document.querySelector('.profile__edit-button');

let nameInput = popupElement.querySelector('.popup__text_type_name');
let jobInput = popupElement.querySelector('.popup__text_type_status');

let profileNameElement = document.querySelector('.profile__title');
let profileJobElement = document.querySelector('.profile__subtitle');
// Функция открытия попапа
function openPopup() {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  popupElement.classList.add('popup_opened');
}
// Функция закрития попапа
function closePopup() {
  popupElement.classList.remove('popup_opened');
}
// Функция закрытия попапа кликом вне попапа
/*function closePopupByClickOnOverlay (event) {
  console.log(event.target, event.currentTarget);
  if (event.target === event.currentTarget) {
    closePopup();
  }
}*/
// Функция изменения имени и статуса
function handleFormSubmit (evt) {
    evt.preventDefault();

    profileNameElement.textContent = nameInput.value;
    profileJobElement.textContent = jobInput.value;

    closePopup();
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
//popupElement.addEventListener('click', closePopupByClickOnOverlay);
popupFormElement.addEventListener('submit', handleFormSubmit);