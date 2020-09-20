import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const { isOpen, onClose } = props;

  const [place, setPlace] = React.useState();
  const [image, setImage] = React.useState();

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }
  function handleChangeImage(e) {
    setImage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: place,
      link: image,
    });
  }

  return (
    <PopupWithForm
      name="popup_card"
      title="Новое место"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-field">
        <input
          id="place-input"
          className="popup__input popup__input_place"
          type="text"
          placeholder="Название"
          name="name"
          minLength="2"
          maxLength="30"
          required
          onChange={handleChangePlace}
          value={place || ""}
        />
        <span id="place-input-error" className="popup__input-error"></span>
      </div>
      <div className="popup__input-field">
        <input
          id="link-input"
          className="popup__input popup__input_link"
          type="url"
          placeholder="Ссылка на картинку"
          name="link"
          required
          onChange={handleChangeImage}
          value={image || ""}
        />
        <span id="link-input-error" className="popup__input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
