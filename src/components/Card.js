export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  // Set up event listeners

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this._trashButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  // Handle the delete button click
  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // Toggle like button
  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  // Create and return the card element
  getView() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardElement = cardTemplate;

    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._trashButton = this._cardElement.querySelector(".card__trash-button");
    this._cardImage = this._cardElement.querySelector(".card__image");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
