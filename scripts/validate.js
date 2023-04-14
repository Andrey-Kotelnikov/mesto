const validationConfig = {
  formSelector: '.popup__content',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__text_type_error'
};

// Функция запуска валидации
const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((form) => {
    setEventListener(form, rest);
  });
};

// Функция навешивания слушателя input
const setEventListener = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, rest);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, rest);
    });
  });
};

// Функция проверки валидности поля
const checkInputValidity = (formElement, inputElement, rest) => {
  if (!inputElement.validity.valid) { // Если поле невалидно, покажет ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage, rest);
  } else { // Если валидно, скроет
    hideInputError(formElement, inputElement, rest);
  }
};

// Функция показа ошибки
const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Находим елемент с ошибкой
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
};

// Функция скрытия ошибки
const hideInputError = (formElement, inputElement, {inputErrorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Находим елемент с ошибкой
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
};

// Функция изменения состояния кнопки
const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) { // сделай кнопку неактивной
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else { // иначе сделай кнопку активной
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled', true);
  }
};

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => { // проходим по этому массиву методом some
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
};

enableValidation(validationConfig);