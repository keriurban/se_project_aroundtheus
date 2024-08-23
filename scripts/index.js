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

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// WRAPPERS

const profileEditpopup = document.querySelector("#profile-edit-popup");
const profileEditForm = document.forms["profile-edit-form"];
const cardListElement = document.querySelector(".cards__list");
const addCardpopup = document.querySelector("#add-card-popup");
const addCardForm = document.forms["add-card-form"];

const previewImagepopup = document.querySelector("#preview-image-popup");
const previewpopupClose = previewImagepopup.querySelector(
  "#preview-image-close"
);
const popupImageElement = previewImagepopup.querySelector(
  ".popup__image-popup"
);
const popupCaption = previewImagepopup.querySelector(".popup__preview-caption");
const closeButtons = document.querySelectorAll(".popup__close");

// BUTTONS and other DOM NODES

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditClose = profileEditpopup.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addCardButton = document.querySelector("#add-card-button");
const addCardClose = addCardpopup.querySelector(".popup__close");

// FORM DATA

const profileTitleInput = profileEditForm.querySelector("#profile-title-input");
const profileDescriptionInput = profileEditForm.querySelector(
  "#profile-description-input"
);

const addCardTitleInput = addCardForm.querySelector("#add-card-title-input");
const addCardUrlInput = addCardForm.querySelector("#add-card-url-input");

// --------FUNCTIONS

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEsc);
  popup.removeEventListener("mousedown", handlePopupClick);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEsc);
  popup.addEventListener("mousedown", handlePopupClick);
}

function handlePopupClick(evt) {
  if (
    evt.currentTarget === evt.target ||
    evt.target.classList.contains("popup__close")
  ) {
    closePopup(evt.currentTarget);
  }
}

function handleEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const trashButton = cardElement.querySelector(".card__trash-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  trashButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;

  cardImageElement.addEventListener("click", () => {
    popupImageElement.src = cardData.link;
    popupCaption.textContent = cardData.name;
    popupImageElement.alt = cardData.name;
    openPopup(previewImagepopup);
  });

  return cardElement;
}

// --------EVENT HANDLERS

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditpopup);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardUrlInput.value;
  const cardElement = getCardElement({
    name,
    link,
  });
  cardListElement.prepend(cardElement);
  addCardForm.reset();
  closePopup(addCardpopup);
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

// EVENT LISTENERS

profileEditButton.addEventListener("click", () => {
  openPopup(profileEditpopup);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardButton.addEventListener("click", () => {
  openPopup(addCardpopup);
});

addCardForm.addEventListener("submit", handleAddCardSubmit);

// FOR EACH

initialCards.forEach((cardData) => renderCard(cardData, cardListElement));

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});
