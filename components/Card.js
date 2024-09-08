export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick; // Assign the passed handler
  }

  // Set up event listeners
  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._cardElement
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this._name, this._link); // Call the image click handler
      });
  }

  // Handle the delete button click
  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null; // Clear the reference
  }

  // Toggle like button
  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  // Create and return the card element
  getView() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardElement = cardTemplate;

    // Set card data (image, title)
    const cardImageElement = this._cardElement.querySelector(".card__image");
    const cardTitleElement = this._cardElement.querySelector(".card__title");

    cardImageElement.src = this._link;
    cardImageElement.alt = this._name;
    cardTitleElement.textContent = this._name;

    // Set event listeners
    this._setEventListeners();

    return this._cardElement;
  }
}
