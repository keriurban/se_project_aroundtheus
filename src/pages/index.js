//import all classes
import "./index.css";

import { selectors, validationSettings } from "../utils/constants.js";
import api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";

// Function to handle image clicks
function handleImageClick(name, link) {
  imagePopup.open({ name, link });
}

// Create card function
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    (cardId) => {
      console.log(`Opening confirmation popup for card ID: ${cardId}`);

      deleteConfirmationPopup.setSubmitAction(() => {
        console.log(`Submitting delete request for card ID: ${cardId}`);
        return api
          .deleteCard(cardId)
          .then(() => {
            console.log(`API delete successful for card ID: ${cardId}`);
            card.removeCard(); // Remove the card from DOM
            deleteConfirmationPopup.close(); // Close popup
          })
          .catch((err) => console.error("Error deleting card:", err));
      });

      deleteConfirmationPopup.open(); // Move the open call here
    }
  );
  return card.getView();
}

// DOM elements
const profileEditButton = document.querySelector(selectors.profileEditButton);
const addCardButton = document.querySelector(selectors.addCardButton);

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
        profileEditPopup.close();
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
      addCardPopup.close();
    })
    .catch((err) => console.error("Error adding card:", err));
});

const deleteConfirmationPopup = new PopupWithConfirmation(
  selectors.deleteCardPopup
);
deleteConfirmationPopup.setEventListeners();

// User Info instance
const userInfo = new UserInfo({
  nameSelector: selectors.profileTitle,
  jobSelector: selectors.profileDescription,
  avatarSelector: selectors.profileAvatar,
});

// Initialize popups
imagePopup.setEventListeners();
profileEditPopup.setEventListeners();
addCardPopup.setEventListeners();
deleteConfirmationPopup.setEventListeners();

// Fetch initial data (user info and cards)
api
  .getInitialData()
  .then(([userData, cards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
      id: userData._id,
    });

    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.error("Error fetching data:", err);
  });

// Event listeners
profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileEditPopup.open();
  profileEditPopup.setInputValues({
    title: userData.name,
    description: userData.job,
  });
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
