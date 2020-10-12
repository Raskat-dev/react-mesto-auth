import React from "react";
import PopupWithForm from "./PopupWithForm";

function AcceptDeletePopup(props) {
  const { isOpen, onClose, onDeleteCard } = props;

  return (
    <PopupWithForm
      name="popup_delete"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onDeleteCard}
      buttonStatus={true}
    />
  );
}

export default AcceptDeletePopup;
