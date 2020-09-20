import React from 'react';
import positivePath from '../images/Union.png';
import negativePath from '../images/Union2.png';

function InfoTooltip({ isInfoTooltipOpen, onClose }) {
  const { confirm, isOpen } = isInfoTooltipOpen

  return (
    <div className={(isOpen ? "popup popup_opened" : "popup")}>
      <div className="popup__container">
        <button className="popup__close" type="button" aria-label="закрыть" onClick={onClose}></button>
        <img className="popup__info" src={(confirm ? (positivePath) : negativePath)} alt="Статус запроса"></img>
  <h3 className="popup__title popup__title_info">{(!confirm ? 'Что-то пошло не так! Попробуйте еще раз.' : 'Вы успешно зарегистрировались!')}</h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
