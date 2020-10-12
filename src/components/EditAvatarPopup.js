import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props;

  const [error, setError] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);

  const avatarRef = React.useRef();

  function handleAvatarChange(evt) {
    if (!evt.target.validity.valid) {
      setError(evt.target.validationMessage);
      setIsValid(false);
    } else {
      setError("");
      setIsValid(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (avatarRef.current.value) {
      onUpdateAvatar({
        avatar: avatarRef.current.value,
      });
      closePopup()
    } else {
      closePopup()
    }
  }

  function closePopup() {
    avatarRef.current.value = "";
    setError("");
    onClose();
  }

  return (
    <PopupWithForm
      name="popup_avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={closePopup}
      onSubmit={handleSubmit}
      buttonStatus={isValid}
    >
      <div className="popup__input-field">
        <input
          id="avatar-input"
          className={
            error ? "popup__input popup__input_type_error" : "popup__input"
          }
          type="url"
          placeholder="Ссылка на аватар"
          name="avatar"
          ref={avatarRef}
          required
          onChange={handleAvatarChange}
        />
        <span
          id="avatar-input-error"
          className={
            error
              ? "popup__input-error popup__input-error_active"
              : "popup__input-error"
          }
        >
          {error}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
