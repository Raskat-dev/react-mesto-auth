import formConfig from './utils';

export default class FormValidator {
  constructor(formElements, formName) {
    this._formName = formName;
    this._formSelector = formElements.formSelector;
    this._inputSelector = formElements.inputSelector;
    this._submitButtonSelector = formElements.submitButtonSelector;
    this._inactiveButtonClass = formElements.inactiveButtonClass;
    this._inputErrorClass = formElements.inputErrorClass;
    this._errorClass = formElements.errorClass;
    this._inputList = Array.from(this._formName.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formName.querySelector(this._submitButtonSelector);
  }
  _showInputError (inputElement, errorMessage)  {
    const errorElement = this._formName.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError (inputElement) {
    const errorElement = this._formName.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput (inputList) {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся фунцкция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState(inputList, buttonElement) {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
          // иначе сделай кнопку активной
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  enableValidation () {
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
       // каждому полю добавим обработчик события input. Провяем все символы
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем checkInputValidity,
        // передав ей форму и проверяемый элемент
        this._checkInputValidity(inputElement);
        //вызов toggleButtonState
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  }
  clear() {
    this._inputList.forEach((inputElement) => {
      const errorElement = this._formName.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
      if (!inputElement.value) {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.disabled = true;
      }  else {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.disabled = false;
      }
    });
  }
}
