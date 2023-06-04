export default class Card {
  constructor(data, templateSelector, handleImagePopup, handleDeletePopup, handleLikeCard, handleDislikeCard, userId) {
    this.data = data
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleImagePopup = handleImagePopup;
    this._handleDeletePopup = handleDeletePopup;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._handleLikeCard = handleLikeCard;
    this._handleDislikeCard = handleDislikeCard;
    this._userId = userId;
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
    this._likeCounter = this._card.querySelector(".element__like-counter");
    this._trash = this._card.querySelector(".element__trash");
    if (this._ownerId !== this._userId) {
      this._trash.classList.add('element__trash_hidden');
    };
    //if (this._ownerId !== 'db37483fe0816108ccbcc01a') {
    //  this._trash.classList.add('element__trash_hidden');
    //};

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._card.querySelector(".element__title").textContent = this._name;
    this._likeCounter.textContent = this._likes.length;

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners () {
    this._card.querySelector(".element__trash").addEventListener("click", () => {
      this._handleDeletePopup(this);
      //this._deleteCard()
    }); // Слушатель на корзину

    this._CheckMyLike()

    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains('element__like_active')) {
        this._handleDislikeCard(this);
        console.log('дизлайк');
      } else {
        this._handleLikeCard(this);
        console.log('лайк');
      }
    }); // Слушатель на лайк

    this._cardImage.addEventListener("click", () => {
      this._handleImagePopup(this.data);
    }); // Слушатель на картинку
  }

  getId() {
    return this._id;
  }

  deleteCard() {
    console.log('удаление в Card');
    this._card.remove();
    this._card = null;
  }

  toggleLike() {
    this._likeButton.classList.toggle("element__like_active");
  }

  likesCounter(data) {
    this._likeCounter.textContent = data.likes.length;
  }

  _CheckMyLike() {
    if (this._likes.filter((like) => like._id === this._userId).length > 0) {
      this._likeButton.classList.add('element__like_active')
    }
    //if (this._likes.filter((like) => like._id === 'db37483fe0816108ccbcc01a').length > 0) {
    //  this._likeButton.classList.add('element__like_active')
    //}
  }
}