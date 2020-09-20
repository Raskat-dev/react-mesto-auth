import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const {name, link, likes, owner} = props.card;

  const currentUser = React.useContext(CurrentUserContext);
  // * Определяем автора и возможность удалить карточку
  const isOwn = owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `${isOwn ? 'card__delete' : 'card__delete_type_hidden'}`
  );
  // * Определяем активный лайк или нет
  const isLiked = likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `${isLiked ? 'card__like card__like_active' : 'card__like'}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <li className="card">
        <img data-link="" className="card__image" alt="" src={link} onClick={handleClick}/>
        <button type="button" className={cardDeleteButtonClassName} aria-label="удалить" onClick={handleDeleteClick} />
        <div className="card__description">
          <h2 data-place="" className="card__title">{name}</h2>
          <div className="card__like-information">
            <button type="button" className={cardLikeButtonClassName} aria-label="лайк" onClick={handleLikeClick} />
            <p className="card__likes-number">{likes.length}</p>
          </div>
        </div>
    </li>
  );
}

export default Card;
