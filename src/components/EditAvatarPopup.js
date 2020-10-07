import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props;

  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    if (avatarRef.current.value) {
      onUpdateAvatar({
        avatar: avatarRef.current.value,
      });
    } else {
      onClose();
    }
  }

  return (
    <PopupWithForm
      name="popup_avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-field">
        <input
          id="avatar-input"
          className="popup__input popup__input_avatar"
          type="url"
          placeholder="Ссылка на аватар"
          name="avatar"
          ref={avatarRef}
          required
        />
        <span id="avatar-input-error" className="popup__input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
