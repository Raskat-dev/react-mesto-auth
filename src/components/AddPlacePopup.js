import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const { isOpen, onClose } = props;

  const [place, setPlace] = React.useState("");
  const [placeError, setPlaceError] = React.useState("");
  const [placeValid, setPlaceValid] = React.useState(false);

  const [image, setImage] = React.useState("");
  const [imageError, setImageError] = React.useState("");
  const [imageValid, setImageValid] = React.useState(false);

  const [isValid, setIsValid] = React.useState(false);

  React.useEffect(() => {
    if (placeValid && imageValid) setIsValid(true);

    return () => {
      setIsValid(false);
    };
  }, [placeValid, imageValid]);

  function handleChangePlace(e) {
    setPlace(e.target.value);
    if (!e.target.validity.valid) {
      setPlaceError(e.target.validationMessage);
      setPlaceValid(false);
    } else {
      setPlaceError("");
      setPlaceValid(true);
    }
  }
  function handleChangeImage(e) {
    setImage(e.target.value);
    if (!e.target.validity.valid) {
      setImageError(e.target.validationMessage);
      setImageValid(false);
    } else {
      setImageError("");
      setImageValid(true);
    }
  }

  function handleClose() {
    onClose();
    setPlace("");
    setImage("");
    setPlaceError("");
    setImageError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (place !== "" && image !== "") {
      props.onAddPlace({
        name: place,
        link: image,
      });
      handleClose();
    } else {
      handleClose();
    }
  }

  return (
    <PopupWithForm
      name="popup_card"
      title="Новое место"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      buttonStatus={isValid}
    >
      <div className="popup__input-field">
        <input
          id="place-input"
          className={
            placeError ? "popup__input popup__input_type_error" : "popup__input"
          }
          type="text"
          placeholder="Название"
          name="name"
          minLength="2"
          maxLength="30"
          required
          onChange={handleChangePlace}
          value={place || ""}
        />
        <span
          id="place-input-error"
          className={
            placeError
              ? "popup__input-error popup__input-error_active"
              : "popup__input-error"
          }
        >
          {placeError}
        </span>
      </div>
      <div className="popup__input-field">
        <input
          id="link-input"
          className={
            imageError ? "popup__input popup__input_type_error" : "popup__input"
          }
          type="url"
          placeholder="Ссылка на картинку"
          name="link"
          required
          onChange={handleChangeImage}
          value={image || ""}
        />
        <span
          id="link-input-error"
          className={
            imageError
              ? "popup__input-error popup__input-error_active"
              : "popup__input-error"
          }
        >
          {imageError}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
