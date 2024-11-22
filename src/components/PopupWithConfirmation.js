import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitButton = this._popupElement.querySelector(
      ".popup__button_confirm"
    );
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", () => {
      if (this._handleSubmit && !this._submitInProgress) {
        this._submitInProgress = true;
        this._handleSubmit().finally(() => {
          this._submitInProgress = false;
        });
      }
    });
  }
}
