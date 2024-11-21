export default class Card {
  constructor(data, cardSelector, handleImageClick, handleDeleteClick) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._isRemoved = false;
  }

  // Set up event listeners
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeIcon());
    this._trashButton.addEventListener("click", () => {
      if (!this._isRemoved) {
        this._handleDeleteClick(this._id);
      }
    });
    this._cardImage.addEventListener("click", () =>
      this._handleImageClick(this._name, this._link)
    );
  }

  // Remove the card element
  removeCard() {
    if (!this._cardElement || this._isRemoved) {
      console.warn(
        `Card element with ID ${this._id} is already removed or null.`
      );
      return;
    }

    console.log(`Removing card with ID: ${this._id}`);

    this._cardElement.remove();
    this._cardElement = null;
    this._isRemoved = true;

    console.log(`Card with ID ${this._id} successfully removed.`);
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
