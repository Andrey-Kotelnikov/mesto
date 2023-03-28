let popupElement = document.querySelector('.popup');
let popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
let popupOpenButtonElement = document.querySelector('.profile__edit-button');

function openPopup() {
  popupElement.classList.add('popup_opened');
}

function closePopup() {
  popupElement.classList.remove('popup_opened');
}

function closePopupByClickOnOverlay (event) {
  console.log(event.target, event.currentTarget);
  if (event.target === event.currentTarget) {
    closePopup();
  }
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);


let nameInput = popupElement.querySelector('.popup__name');
let jobInput = popupElement.querySelector('.popup__status');

let profileNameElement = document.querySelector('.profile__title');
let profileJobElement = document.querySelector('.profile__subtitle');

nameInput.value = profileNameElement.textContent;
jobInput.value = profileJobElement.textContent;

function handleFormSubmit (evt) {
    evt.preventDefault();

    profileNameElement.textContent = nameInput.value;
    profileJobElement.textContent = jobInput.value;

    closePopup();
}

popupElement.addEventListener('submit', handleFormSubmit);