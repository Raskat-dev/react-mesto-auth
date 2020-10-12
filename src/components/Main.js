import React from "react";
import Card from "./Card";
import Header from "./Header";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import AcceptDeletePopup from "./AcceptDeletePopup";
import Loader from "./Loader";
import { cardApi } from "../utils/cardApi";

function Main(props) {
  const { onSignOut, onUpdateAvatar, onUpdateUser, currentUser } = props;
  const { name, about, email, avatar, _id } = currentUser;

  const [onLoad, setOnLoad] = React.useState(true);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [imageData, setImageData] = React.useState({});

  React.useEffect(() => {
    setOnLoad(true);
    cardApi
      .getCardsFromServer()
      .then((cards) => {
        setCards(cards);
        setOnLoad(false);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}.`);
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setImageData(card);
    setIsDeleteCardPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setImageData(card);
    setSelectedCard(true);
  }

  function closeAvatarPopup() {
    setIsEditAvatarPopupOpen(false);
  }

  function closeProfilePopup() {
    setIsEditProfilePopupOpen(false);
  }

  function closeDeleteCardPopup() {
    setIsDeleteCardPopupOpen(false);
  }

  function closeAddPlacePopup() {
    setIsAddPlacePopupOpen(false);
  }

  function closeImagePopup() {
    setSelectedCard(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === _id);

    const apiChangeLike = (newCard) => {
      const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
      setCards(newCards);
    };
    // * Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      cardApi
        .addLike(card._id)
        .then(apiChangeLike)
        .catch((err) => {
          console.log(`Ошибка ${err}.`);
        });
    } else {
      cardApi
        .deleteLike(card._id)
        .then(apiChangeLike)
        .catch((err) => {
          console.log(`Ошибка ${err}.`);
        });
    }
  }
  function handleCardDelete(e) {
    e.preventDefault();
    cardApi
      .deleteCard(imageData._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== imageData._id);
        setCards(newCards);
        closeDeleteCardPopup();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}.`);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    cardApi
      .addNewCard(newCard)
      .then((result) => {
        setCards([result, ...cards]);
        closeAddPlacePopup();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}.`);
      });
  }

  return (
    <main>
      {onLoad && (
        <>
          <Header />
          <Loader />
        </>
      )}
      {!onLoad && (
        <>
          <Header>
            <p className="header__email">{email}</p>
            <button onClick={onSignOut} className="header__exit">
              Выйти
            </button>
          </Header>
          <section className="profile">
            <div
              className="profile__avatarblock"
              onClick={handleEditAvatarClick}
            >
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
                  onClick={handleEditProfileClick}
                ></button>
              </div>
              <p className="profile__description">{about}</p>
            </div>
            <button
              className="profile__add-button"
              type="button"
              aria-label="добавить фото"
              onClick={handleAddPlaceClick}
            ></button>
          </section>
          <ul className="cards">
            {cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteCardClick}
              />
            ))}
          </ul>
          <Footer />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAvatarPopup}
            onUpdateAvatar={onUpdateAvatar}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeProfilePopup}
            onUpdateUser={onUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAddPlacePopup}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ImagePopup
            isOpen={selectedCard}
            onClose={closeImagePopup}
            name={imageData.name}
            link={imageData.link}
          />
          <AcceptDeletePopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closeDeleteCardPopup}
            onDeleteCard={handleCardDelete}
          />
        </>
      )}
    </main>
  );
}

export default Main;
