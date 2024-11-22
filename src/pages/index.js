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

// Function to handle like toggling
function handleLikeClick(cardId, isLiked) {
  if (isLiked) {
    return api.addLike(cardId);
  } else {
    return api.removeLike(cardId);
  }
}

// Create card function
function createCard(cardData) {
  console.log("Card Data:", cardData);

  const card = new Card(
    {
      name: cardData.name,
      link: cardData.link,
      _id: cardData._id,
      isLiked: cardData.isLiked,
    },
    "#card-template",
    handleImageClick,
    (cardId) => {
      deleteConfirmationPopup.setSubmitAction(() => {
        return api.deleteCard(cardId).then(() => {
          card.removeCard();
          deleteConfirmationPopup.close();
        });
      });

      deleteConfirmationPopup.open();
    },
    handleLikeClick
  );
  return card.getView();
}

// DOM elements
const profileEditButton = document.querySelector(selectors.profileEditButton);
const addCardButton = document.querySelector(selectors.addCardButton);
const avatarEditButton = document.querySelector(".profile__avatar-edit-button");

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
      });
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
    });
});

const deleteConfirmationPopup = new PopupWithConfirmation(
  selectors.deleteCardPopup
);
deleteConfirmationPopup.setEventListeners();

const avatarEditPopup = new PopupWithForm("#avatar-edit-popup", (formData) => {
  return api.updateAvatar(formData.avatar).then((updatedUserInfo) => {
    userInfo.setUserInfo({
      name: updatedUserInfo.name,
      job: updatedUserInfo.about,
      avatar: updatedUserInfo.avatar,
    });
  });
});
avatarEditPopup.setEventListeners();

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
  formValidators["profile-edit-form"].resetValidation();
});

avatarEditButton.addEventListener("click", () => {
  avatarEditPopup.open();
  formValidators["avatar-edit-form"].resetValidation();
});

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
  formValidators["add-card-form"].resetValidation();
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
