export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector); // Select the popup element
    this._handleEscClose = this._handleEscClose.bind(this); // Ensure correct 'this' context
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("popup_opened") ||
        event.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}
