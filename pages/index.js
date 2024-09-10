import Card from "/components/Card.js";
import FormValidator from "/components/FormValidator.js";

// Initial card data
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// WRAPPERS
const profileEditpopup = document.querySelector("#profile-edit-popup");
const profileEditForm = document.forms["profile-edit-form"];
const cardListElement = document.querySelector(".cards__list");
const addCardpopup = document.querySelector("#add-card-popup");
const addCardForm = document.forms["add-card-form"];
const previewImagepopup = document.querySelector("#preview-image-popup");

// BUTTONS and other DOM NODES
const profileEditButton = document.querySelector("#profile-edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addCardButton = document.querySelector("#add-card-button");

// FORM DATA
const profileTitleInput = profileEditForm.querySelector("#profile-title-input");
const profileDescriptionInput = profileEditForm.querySelector(
  "#profile-description-input"
);
const addCardTitleInput = addCardForm.querySelector("#add-card-title-input");
const addCardUrlInput = addCardForm.querySelector("#add-card-url-input");

const popupImageElement = previewImagepopup.querySelector(
  ".popup__image-popup"
);
const popupCaption = previewImagepopup.querySelector(".popup__preview-caption");

// --------FUNCTIONS

// Function to handle image click and open the preview modal
function handleImageClick(name, link) {
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaption.textContent = name;

  openPopup(previewImagepopup);
}

// Function to open a popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEsc);
  popup.addEventListener("mousedown", handlePopupClick);
}

// Function to close a popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEsc);
  popup.removeEventListener("mousedown", handlePopupClick);
}

// Handle popup close by clicking overlay or close button
function handlePopupClick(evt) {
  if (
    evt.currentTarget === evt.target ||
    evt.target.classList.contains("popup__close")
  ) {
    closePopup(evt.currentTarget);
  }
}

// Handle closing popups by pressing the Escape key
function handleEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

// Create a card using the Card class
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView(); // Return fully functional card element
}

// Render function
function renderCard(cardData, method = "prepend") {
  const cardElement = createCard(cardData);

  // Check the method and use the correct one explicitly
  if (method === "prepend") {
    cardListElement.prepend(cardElement);
  } else if (method === "append") {
    cardListElement.append(cardElement);
  } else {
    console.error(`Unknown method: ${method}`);
  }
}

// Event handler for profile edit form submission
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditpopup);
}

// --------EVENT LISTENERS

// Open the profile edit popup
profileEditButton.addEventListener("click", () => {
  openPopup(profileEditpopup);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

// Handle form submissions for profile edit and add card
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

// Open the add card popup
addCardButton.addEventListener("click", () => {
  openPopup(addCardpopup);
});

// Initial render of cards
initialCards.forEach((cardData) => renderCard(cardData, "prepend"));

// Validation

const validationSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const formValidatorForAddCard = new FormValidator(
  validationSettings,
  addCardForm
);
formValidatorForAddCard.enableValidation();

// Event handler for adding a new card
function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardUrlInput.value;
  renderCard({ name, link }, "prepend");
  addCardForm.reset();
  closePopup(addCardpopup);
  formValidatorForAddCard.disableSubmitButton();
}

// Get all forms
const formElements = document.querySelectorAll(".popup__form");

// Enable validation for each form
formElements.forEach((formElement) => {
  const formValidator = new FormValidator(validationSettings, formElement);
  formValidator.enableValidation();
});
