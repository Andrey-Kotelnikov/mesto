import { handleOpenImagePopup } from './utils.js';

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._card = this._getTemplate();

    this._card.querySelector(".element__image").src = this._link;
    this._card.querySelector(".element__image").alt = this._name;
    this._card.querySelector(".element__title").textContent = this._name;

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners () {
    this._card.querySelector(".element__trash").addEventListener("click", () => {
      this._deleteCard();
    }); // Слушатель на корзину

    this._card.querySelector(".element__like").addEventListener("click", () => {
      this._handleLikeButton();
    }); // Слушатель на лайк

    this._card.querySelector(".element__image").addEventListener("click", () => {
      this._handleOpenImagePopup();
    }); // Слушатель на картинку
  }

  _deleteCard() {
    this._card.remove();
  }

  _handleLikeButton() {
    this._likeButton = this._card.querySelector(".element__like");
    this._likeButton.classList.toggle("element__like_active");
  }

  _handleOpenImagePopup() {
    handleOpenImagePopup({name: this._name, link: this._link})
  }
}

export default Card;