import React from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import { apiRequest } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth.js";

function App() {
  const history = useHistory();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [imageData, setImageData] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState({ status: false, email: "" });
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState({
    confirm: null,
    isOpen: false,
  });

  React.useEffect(() => {
    tokenCheck();
    Promise.all([apiRequest.getProfileInfo(), apiRequest.getCardsFromServer()])
      .then(([user, cards]) => {
        setCurrentUser({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          _id: user._id,
        });
        setCards(cards);
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
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setImageData({}); //! если обнулять при закрытии, то картинка исчезает до закрытия анимации
    setImageData(card);
    setSelectedCard(true);
  }

  function closeAvatarPopup() {
    setIsEditAvatarPopupOpen(false);
  }

  function closeProfilePopup() {
    setIsEditProfilePopupOpen(false);
  }

  function closeAddPlacePopup() {
    setIsAddPlacePopupOpen(false);
  }

  function closeImagePopup() {
    setSelectedCard(false);
  }

  function closeInfoPopup() {
    setIsInfoTooltipOpen({ ...isInfoTooltipOpen, isOpen: false });
  }

  function handleUpdateUser(user) {
    apiRequest
      .changeProfileInfo(user)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          about: res.about,
          avatar: res.avatar,
          _id: res._id,
        });
        closeProfilePopup()
      })
      .catch((err) => {
        console.log(`Ошибка ${err}.`);
      });
  }

  function handleUpdateAvatar(user) {
    apiRequest
      .changeProfileAvatar(user)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          about: res.about,
          avatar: res.avatar,
          _id: res._id,
        });
        closeAvatarPopup();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}.`);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    const apiChangeLike = (newCard) => {
      const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
      setCards(newCards);
    };
    // * Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      apiRequest
        .addLike(card._id)
        .then(apiChangeLike)
        .catch((err) => {
          console.log(`Ошибка ${err}.`);
        });
    } else {
      apiRequest
        .deleteLike(card._id)
        .then(apiChangeLike)
        .catch((err) => {
          console.log(`Ошибка ${err}.`);
        });
    }
  }
  function handleCardDelete(card) {
    apiRequest
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}.`);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    apiRequest
      .addNewCard(newCard)
      .then((result) => {
        setCards([result, ...cards]);
        closeAddPlacePopup()
      })
      .catch((err) => {
        console.log(`Ошибка ${err}.`);
      });
  }

  function handleLogin() {
    setLoggedIn({ ...loggedIn, status: true });
  }

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            const email = res.data.email;
            setLoggedIn({ status: true, email: email });
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function onRegister({ password, email }) {
    return auth
      .register(password, email)
      .then(() => setIsInfoTooltipOpen({ confirm: true, isOpen: true }))
      .then(() => history.push("/sign-in"))
      .catch(() => setIsInfoTooltipOpen({ confirm: false, isOpen: true }));
  }

  function onLogin({ password, email }) {
    return auth
      .authorization(password, email)
      .then((res) => {
        if (res.token) {
          handleLogin();
          history.push("/");
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => console.log(err));
  }

  function onSignOut() {
    localStorage.removeItem("token");
    history.push("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route path="/sign-up">
            <Header>
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            </Header>
            <Register onRegister={onRegister} />
          </Route>
          <Route path="/sign-in">
            <Header>
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            </Header>
            <Login onLogin={onLogin} />
          </Route>
          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onSignOut={onSignOut}
          />
        </Switch>
        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAvatarPopup}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeProfilePopup}
          onUpdateUser={handleUpdateUser}
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
        <InfoTooltip
          isInfoTooltipOpen={isInfoTooltipOpen}
          onClose={closeInfoPopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
