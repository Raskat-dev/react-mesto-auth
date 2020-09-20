import React from 'react';

function PopupWithForm(props) {
  return (
    <div id={props.name} className={(props.isOpen ? "popup popup_opened" : "popup")}>
      <form className="popup__container" method="post" action="#" name={props.name} noValidate onSubmit={props.onSubmit}>
        <button className="popup__close" type="button" aria-label="закрыть" onClick={props.onClose}></button>
        <h3 className={`popup__title ${props.titleModifier}`}>{props.title}</h3>
        {props.children}
        <button className="popup__save" type="submit">{props.buttonText}</button>
      </form>
    </div>
  );
}

export default PopupWithForm;
