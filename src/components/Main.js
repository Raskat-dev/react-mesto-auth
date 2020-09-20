import React from "react";
import Card from "./Card";
import Header from "./Header";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const { name, about, avatar } = React.useContext(CurrentUserContext);
  const { cards, onCardLike, onCardDelete, onSignOut } = props;
  const { email } = props.loggedIn

  return (
    <main>
      <Header>
          <p className="header__email">{email}</p>
          <button onClick={onSignOut} className="header__exit">Выйти</button>
      </Header>
      <section className="profile">
        <div className="profile__avatarblock" onClick={props.onEditAvatar}>
          <div className="profile__editava"></div>
          <img src={avatar} alt="аватар" className="profile__avatar" />
        </div>
        <div className="profile__information">
          <div className="profile__user">
            <h1 className="profile__name">{name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="редактировать"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__description">{about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="добавить фото"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <ul className="cards">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </ul>
    </main>
  );
}

export default Main;
