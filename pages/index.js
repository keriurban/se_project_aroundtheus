//import all classes

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

const profileEditForm = document.forms["profile-edit-form"];
const addCardForm = document.forms["add-card-form"];
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
const addCardPopup = new PopupWithForm(selectors.addCardPopup, (formData) => {
  const newCard = createCard({ name: formData.title, link: formData.url });
  cardSection.addItem(newCard);
});

const userInfo = new UserInfo({
  nameSelector: selectors.profileTitle,
  jobSelector: selectors.profileDescription,
});

const profileEditPopup = new PopupWithForm(
  selectors.profileEditPopup,
  (formData) => {
    userInfo.setUserInfo({
      name: formData.title,
      job: formData.description,
    });
  }
);

//initialize all instances

cardSection.renderItems();

document
  .querySelector(selectors.cardSection)
  .addEventListener("click", (event) => {
    if (event.target.classList.contains("card__image")) {
      const cardData = {
        name: event.target.alt,
        link: event.target.src,
      };
      imagePopup.open(cardData);
    }
  });

imagePopup.setEventListeners();
profileEditPopup.setEventListeners();
addCardPopup.setEventListeners();

//Event Listeners

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.job;
  profileEditPopup.open();
});

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

const formValidators = {};

// --------FUNCTIONS

function handleImageClick(name, link) {
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaption.textContent = name;

  imagePopup.open({ name, link });
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

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

function renderCard(cardData, method = "prepend") {
  const cardElement = createCard(cardData);

  if (method === "prepend") {
    cardListElement.prepend(cardElement);
  } else if (method === "append") {
    cardListElement.append(cardElement);
  } else {
    console.error(`Unknown method: ${method}`);
  }
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

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.job;
  profileEditPopup.open();
});

const formElements = document.querySelectorAll(".popup__form");
