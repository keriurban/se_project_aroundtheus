import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._submitButton = this._form.querySelector(".popup__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      if (data[input.name]) {
        input.value = data[input.name];
      }
    });
  }

  // Method to toggle the submit button state
  _toggleSubmitButton() {
    const isFormValid = this._form.checkValidity();
    if (isFormValid) {
      this._submitButton.removeAttribute("disabled");
      this._submitButton.classList.remove("popup__button_disabled");
    } else {
      this._submitButton.setAttribute("disabled", true);
      this._submitButton.classList.add("popup__button_disabled");
    }
  }

  setEventListeners() {
    super.setEventListeners();

    // Add input event listener to toggle button state
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => this._toggleSubmitButton());
    });

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = "Saving...";
      this._handleFormSubmit(this._getInputValues())
        .then(() => {
          this.close();
          this._form.reset();
        })
        .catch((err) => console.error(err))
        .finally(() => {
          this._submitButton.textContent = this._submitButtonText;
        });
    });
  }
}
