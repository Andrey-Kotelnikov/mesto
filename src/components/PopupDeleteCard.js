import Popup from "./Popup.js";
//import { deleteItem } from "./Api.js";

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._deleteButton = this._popup.querySelector('.popup__save-button');
  }

  handleDeleteButton(func) {
    this.deleteFuntion = func;
    //console.log(func)
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteButton.addEventListener('click', () => {
      this.deleteFuntion()
    })
  }
}