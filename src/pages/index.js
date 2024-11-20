// Import all classes and styles
import "./index.css";

import { selectors, validationSettings } from "../utils/constants.js";
import api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

// Functions
function handleImageClick(name, link) {
  imagePopup.open({ name, link });
}

function createCard(cardData) {
  const card = new Card(
    {
      name: cardData.name,
      link: cardData.link,
      _id: cardData._id,
    },
    "#card-template",
    handleImageClick,
    handleDeleteClick
  );
  return card.getView();
}

function handleDeleteClick(cardElement, cardId) {
  deleteConfirmationPopup.open();
  deleteConfirmationPopup.setSubmitAction(() => {
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        deleteConfirmationPopup.close();
      })
      .catch((err) => {
        console.error("Error deleting card:", err);
      });
  });
}

// DOM elements
const profileEditButton = document.querySelector(selectors.profileEditButton);
const addCardButton = document.querySelector(selectors.addCardButton);

const profileAvatar = document.querySelector(selectors.profileAvatar);
const profileName = document.querySelector(selectors.profileTitle);
const profileAbout = document.querySelector(selectors.profileDescription);

// Section instance for rendering cards
const cardSection = new Section(
  {
    items: [],
    renderer: (item) => {
      const card = createCard(item);
      cardSection.addItem(card);
    },
  },
  selectors.cardSection
);

// Popup instances
const imagePopup = new PopupWithImage(selectors.previewImagePopup);

const profileEditPopup = new PopupWithForm(
  selectors.profileEditPopup,
  (formData) => {
    return api
      .updateUserInfo({
        name: formData.title,
        about: formData.description,
      })
      .then((updatedData) => {
        userInfo.setUserInfo({
          name: updatedData.name,
          job: updatedData.about,
        });
      })
      .catch((err) => console.error("Error updating profile:", err));
  }
);

const addCardPopup = new PopupWithForm(selectors.addCardPopup, (formData) => {
  return api
    .addCard({
      name: formData.title,
      link: formData.url,
    })
    .then((newCard) => {
      const card = createCard(newCard);
      cardSection.addItem(card);
    })
    .catch((err) => console.error("Error adding card:", err));
});

const deleteConfirmationPopup = new PopupWithConfirmation(
  selectors.deleteConfirmationPopup
);

deleteConfirmationPopup.setEventListeners();

// User Info instance
const userInfo = new UserInfo({
  nameSelector: selectors.profileTitle,
  jobSelector: selectors.profileDescription,
});

// Initialize popups
imagePopup.setEventListeners();
profileEditPopup.setEventListeners();
addCardPopup.setEventListeners();

// Fetch initial data
api
  .getInitialData()
  .then(([fetchedUserInfo, cards]) => {
    profileAvatar.src = fetchedUserInfo.avatar;
    profileName.textContent = fetchedUserInfo.name;
    profileAbout.textContent = fetchedUserInfo.about;

    cardSection.renderItems(cards);
  })
  .catch((err) => console.error("Error fetching data:", err));

// Event listeners
profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileEditPopup.setInputValues({
    title: userData.name,
    description: userData.job,
  });
  profileEditPopup.open();
});

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

// Form validation
const formValidators = {};

const enableValidation = (settings) => {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));
  forms.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSettings);
