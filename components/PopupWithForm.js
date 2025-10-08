import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }, handleTotal) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._popupInputList = this._popupForm.querySelectorAll(".popup__input");
    this._handleTotal = handleTotal;
  }

  _getInputValues() {
    const inputValues = {};
    this._popupInputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();

      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);

      if (this._handleTotal) {
        this._handleTotal(true);
      }
    });
  }
}

export default PopupWithForm;
