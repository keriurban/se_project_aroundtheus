//import all classes

import "./index.css";

import {
  initialCards,
  selectors,
  validationSettings,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// DOM elements

const profileEditPopup = new PopupWithForm(
  selectors.profileEditPopup,
  (formData) => {
    userInfo.setUserInfo({
      name: formData.title,
      job: formData.description,
    });
  }
);

const addCardPopup = new PopupWithForm(selectors.addCardPopup, (formData) => {
  const newCard = createCard({ name: formData.title, link: formData.url });
  cardSection.addItem(newCard);
});

const profileEditForm = profileEditPopup.getForm();
const addCardForm = addCardPopup.getForm();
const profileTitleInput = profileEditForm.querySelector(
  selectors.profileTitleInput
);
const profileDescriptionInput = profileEditForm.querySelector(
  selectors.profileDescriptionInput
);
const addCardTitleInput = addCardForm.querySelector(
  selectors.addCardTitleInput
);
const addCardUrlInput = addCardForm.querySelector(selectors.addCardUrlInput);
const popupImageElement = document.querySelector(selectors.popupImageElement);
const popupCaption = document.querySelector(selectors.popupCaption);
const profileEditButton = document.querySelector(selectors.profileEditButton);
const addCardButton = document.querySelector(selectors.addCardButton);

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      cardSection.addItem(card);
    },
  },
  selectors.cardSection
);

const imagePopup = new PopupWithImage(selectors.previewImagePopup);

const userInfo = new UserInfo({
  nameSelector: selectors.profileTitle,
  jobSelector: selectors.profileDescription,
});

//initialize all instances

cardSection.renderItems();

imagePopup.setEventListeners();
profileEditPopup.setEventListeners();
addCardPopup.setEventListeners();

//Event Listeners

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.job;
  formValidators["profile-edit-form"].resetValidation();
  profileEditPopup.open();
});

addCardButton.addEventListener("click", () => {
  formValidators["add-card-form"].resetValidation();
  addCardPopup.open();
});

const formValidators = {};

// --------FUNCTIONS

function handleImageClick(name, link) {
  imagePopup.open({ name, link });
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

const enableValidation = (validationSettings) => {
  const formList = Array.from(
    document.querySelectorAll(validationSettings.formSelector)
  );
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationSettings, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSettings);
