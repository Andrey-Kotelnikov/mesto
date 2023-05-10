class FormValidator {
  constructor(
    form,
    {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      ...rest
    }
  ) {
    this.form = form;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._otherParams = rest;
  }

  enableValidation () {
    this._inputList = Array.from(this.form.querySelectorAll(this._inputSelector));
    this._buttonElement = this.form.querySelector(this._submitButtonSelector);
    this._setEventListener();
  }

  _setEventListener () {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  _checkInputValidity (inputElement) {
    const errorElement = this.form.querySelector(`.${inputElement.id}-error`); // Находим елемент с ошибкой
    if (!inputElement.validity.valid) { // Если поле невалидно, покажет ошибку
      this._showInputError(inputElement, errorElement);
    } else { // Если валидно, скроет
      this._hideInputError(inputElement, errorElement);
    }
  }

  _showInputError = (inputElement, errorElement) => {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError = (inputElement, errorElement) => {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  }

  toggleButtonState () {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) { // сделай кнопку неактивной
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else { // иначе сделай кнопку активной
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled', true);
    }
  }

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }
}

export default FormValidator