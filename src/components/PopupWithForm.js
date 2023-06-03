import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector('.popup__content');
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__text'));
    this._submitButton = this._form.querySelector('.popup__save-button');
    this._textButton = this._submitButton.textContent;
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
      //this.close();
    })
  }

  close() {
    this._form.reset();
    super.close();
  }

  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name]
    })
  }

  loading(check, textLoading) {
    if (check) {
      this._submitButton.textContent = textLoading;
    } else {
      this._submitButton.textContent = this._textButton;
    }
  }
}