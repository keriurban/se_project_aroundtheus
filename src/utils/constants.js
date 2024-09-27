// Initial card data
export const initialCards = [
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

export const selectors = {
  profileEditButton: "#profile-edit-button",
  addCardButton: "#add-card-button",
  profileEditPopup: "#profile-edit-popup",
  addCardPopup: "#add-card-popup",
  previewImagePopup: "#preview-image-popup",
  profileEditForm: "form[name='profile-edit-form']",
  addCardForm: "form[name='add-card-form']",
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
  profileTitleInput: "#profile-title-input",
  profileDescriptionInput: "#profile-description-input",
  addCardTitleInput: "#add-card-title-input",
  addCardUrlInput: "#add-card-url-input",
  cardSection: ".cards__list",
  popupImageElement: ".popup__image-popup",
  popupCaption: ".popup__preview-caption",
};

export const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
