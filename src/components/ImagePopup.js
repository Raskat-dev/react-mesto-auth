import React from 'react';

function ImagePopup(props) {
  return (
<div id="popup_photo" className={(props.isOpen ? "popup popup_opened popup_opacity_dark" : "popup popup_opacity_dark")}>
  <div className="popup__photo-position">
    <button className="popup__close" type="button" aria-label="закрыть" onClick={props.onClose}></button>
      <img alt={props.name} className="popup__image" src={props.link}/>
  <p className="popup__place">{props.name}</p>
  </div>
</div>
  );
}

export default ImagePopup;
