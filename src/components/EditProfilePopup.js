import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser } = props;

  const [name, setName] = React.useState("");
  const [nameError, setNameError] = React.useState("");
  const [nameValid, setNameValid] = React.useState(true);

  const [about, setAbout] = React.useState("");
  const [aboutError, setAboutError] = React.useState("");
  const [aboutValid, setAboutValid] = React.useState(true);

  const [isValid, setIsValid] = React.useState(false);

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setAbout(currentUser.about);
    }
  }, [currentUser, isOpen]);

  React.useEffect(() => {
    if (nameValid && aboutValid) setIsValid(true);

    return () => {
      setIsValid(false);
    };
  }, [nameValid, aboutValid]);

  function handleChangeName(e) {
    setName(e.target.value);
    if (!e.target.validity.valid) {
      setNameError(e.target.validationMessage);
      setNameValid(false);
    } else {
      setNameError("");
      setIsValid(true);
    }
  }
  function handleChangeAbout(e) {
    setAbout(e.target.value);
    if (!e.target.validity.valid) {
      setAboutError(e.target.validationMessage);
      setAboutValid(false);
    } else {
      setAboutError("");
      setAboutValid(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name && about) {
      onUpdateUser({
        name,
        about,
      });
      closePopup()
    } else {
      closePopup()
    }
  }

  function closePopup() {
    setNameError("");
    setAboutError("");
    onClose();
  }

  return (
    <PopupWithForm
      name="popup_author"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={closePopup}
      onSubmit={handleSubmit}
      buttonStatus={isValid}
    >
      <div className="popup__input-field">
        <input
          id="name-input"
          className={
            nameError ? "popup__input popup__input_type_error" : "popup__input"
          }
          type="text"
          placeholder="Введите имя"
          name="name"
          required
          minLength="2"
          maxLength="40"
          pattern="[A-Za-zА-ЯЁа-яё -]{1,}"
          onChange={handleChangeName}
          value={name || ""}
        />
        <span
          id="name-input-error"
          className={
            nameError
              ? "popup__input-error popup__input-error_active"
              : "popup__input-error"
          }
        >
          {nameError}
        </span>
      </div>
      <div className="popup__input-field">
        <input
          id="job-input"
          className={
            aboutError ? "popup__input popup__input_type_error" : "popup__input"
          }
          type="text"
          placeholder="Род занятий"
          name="about"
          required
          minLength="2"
          maxLength="40"
          onChange={handleChangeAbout}
          value={about || ""}
        />
        <span
          id="job-input-error"
          className={
            aboutError
              ? "popup__input-error popup__input-error_active"
              : "popup__input-error"
          }
        >
          {aboutError}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
