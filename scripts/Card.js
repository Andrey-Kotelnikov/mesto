class Card {
  constructor(data, templateSelector, openImagePopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openImagePopup = openImagePopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector(".element__image");
    this._likeButton = this._card.querySelector(".element__like");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
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
      this._openImagePopup({name: this._name, link: this._link});
    }); // Слушатель на картинку
  }

  _deleteCard() {
    this._card.remove();
    this._card = null;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("element__like_active");
  }
}

export default Card;