class FormValidator{
    constructor(settings, formElement ){
        this._inputSelector = settings.inputSelector;
        this._errorClass = settings.errorClass;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._formElement = formElement;
        this._inputList = Array.from(
        this._formElement.querySelectorAll(this._inputSelector),
  );
        this._buttonElement = this._formElement.querySelector(
    this._submitButtonSelector,
  );
    } 

    _showInputError(inputElement, errorMessage){
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
  }

    _checkInputValidity(inputElement){
      if (!inputElement.validity.valid) {
        this._showInputError(
      inputElement,
      inputElement.validationMessage,
    );
  } else {
        this._hideInputError(inputElement);
  }
    }

    _hasInvalidInput(){
        return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
    }

    _toggleButtonState(){
        if (this._hasInvalidInput()) {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  } else {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }}

  _setEventListeners(){
       
    this._toggleButtonState();

  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState();
    });
  });
    }

    enableValidation() {
        this._formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
  });
        this._setEventListeners(); 
    }

    resetValidation(){
      this._formElement.reset();
      this._inputList.forEach((inputElement) => {
    this._hideInputError(inputElement);
  });
    this._toggleButtonState();
    
    }
    
}

export default FormValidator;